const API = 'https://api.github.com';
const TOKEN = process.env.GITHUB_TOKEN;
const REPO = process.env.GITHUB_REPOSITORY;
const DRY_RUN = process.env.DRY_RUN === 'true';

const MARKER_RE = /<!-- review-sla (\{.*?\}) -->/;
const OVERDUE_LABEL = 'review-overdue';
const TN_RE = /^T-(\d{2})$/;
const MAX_HOURS = 24;
const HOUR_MS = 3_600_000;

if (!TOKEN || !REPO) {
  console.error('GITHUB_TOKEN 과 GITHUB_REPOSITORY 환경 변수가 필요합니다.');
  process.exit(1);
}

const api = async (path, init = {}) => {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: {
      authorization: `Bearer ${TOKEN}`,
      accept: 'application/vnd.github+json',
      'x-github-api-version': '2022-11-28',
      ...(init.body ? { 'content-type': 'application/json' } : {}),
    },
  });

  if (!res.ok) {
    throw new Error(
      `${init.method ?? 'GET'} ${path} → ${res.status} ${await res.text()}`
    );
  }

  return res.status === 204 ? null : res.json();
};

const paginate = async (path) => {
  const joiner = path.includes('?') ? '&' : '?';
  const items = [];

  for (let page = 1; ; page += 1) {
    const batch = await api(`${path}${joiner}per_page=100&page=${page}`);
    items.push(...batch);
    if (batch.length < 100) return items;
  }
};

const pad = (hours) => String(hours).padStart(2, '0');

const toKst = (iso) =>
  new Date(iso).toLocaleString('ko-KR', {
    timeZone: 'Asia/Seoul',
    dateStyle: 'medium',
    timeStyle: 'short',
  });

const findMarker = async (number) => {
  const comments = await paginate(`/repos/${REPO}/issues/${number}/comments`);

  for (const comment of comments) {
    const matched = comment.body?.match(MARKER_RE);
    if (!matched) continue;

    try {
      return { id: comment.id, state: JSON.parse(matched[1]) };
    } catch {
      return { id: comment.id, state: null };
    }
  }

  return null;
};

const renderComment = (state) => {
  const when = toKst(state.deadline);
  const headline =
    state.tracked === OVERDUE_LABEL
      ? `**리뷰 마감 초과** — ${when} 기한을 넘겼습니다.`
      : `**리뷰 마감** — ${when}`;

  return [
    `<!-- review-sla ${JSON.stringify(state)} -->`,
    headline,
    '',
    `선언 ${state.declared} · 현재 ${state.tracked}`,
  ].join('\n');
};

const resolveDeadline = ({ current, previous, events }) => {
  const hours = TN_RE.test(current) ? Number(current.slice(2)) : undefined;
  const attached = events
    .filter((event) => event.event === 'labeled' && event.label?.name === current)
    .sort((a, b) => b.id - a.id)[0];
  const isCountdown = attached?.actor?.login === 'github-actions[bot]';

  const isNewDeclaration = hours !== undefined && attached && !isCountdown &&
    attached.id !== previous?.declaration_event_id;

  if (isNewDeclaration) {
    return {
      deadline: new Date(Date.parse(attached.created_at) + hours * HOUR_MS).toISOString(),
      declared: current,
      declaration_event_id: attached.id,
    };
  }

  if (!previous) return null;

  return {
    deadline: new Date(previous.deadline).toISOString(),
    declared: previous.declared ?? current,
    declaration_event_id: previous.declaration_event_id,
  };
};

const ensureLabels = async () => {
  const existing = new Set(
    (await paginate(`/repos/${REPO}/labels`)).map((label) => label.name)
  );

  const missing = [
    ...Array.from({ length: MAX_HOURS }, (_, index) => index + 1).map((hours) => ({
      name: `T-${pad(hours)}`,
      color: hours <= 4 ? 'b60205' : hours <= 12 ? 'd93f0b' : 'fbca04',
      description: `${hours}시간 내 리뷰 완료`,
    })),
    { name: OVERDUE_LABEL, color: '000000', description: '리뷰 마감 시간 초과' },
  ].filter((label) => !existing.has(label.name));

  if (!missing.length) return;

  console.log(`라벨 ${missing.length}건 생성: ${missing.map((label) => label.name).join(', ')}`);
  if (DRY_RUN) return;

  for (const label of missing) {
    await api(`/repos/${REPO}/labels`, {
      method: 'POST',
      body: JSON.stringify(label),
    });
  }
};

const run = async () => {
  const now = Date.now();
  await ensureLabels();
  const pulls = await paginate(`/repos/${REPO}/pulls?state=open`);
  let updated = 0;

  for (const pr of pulls) {
    if (pr.draft) continue;

    const names = pr.labels.map((label) => label.name);
    const current = names.filter((name) => TN_RE.test(name)).sort()[0]
      ?? (names.includes(OVERDUE_LABEL) ? OVERDUE_LABEL : null);
    if (!current) continue;

    const marker = await findMarker(pr.number);
    const previous = marker?.state ?? null;

    const events = await paginate(`/repos/${REPO}/issues/${pr.number}/events`);
    const resolved = resolveDeadline({ current, previous, events });
    if (!resolved) continue;

    const remaining = Date.parse(resolved.deadline) - now;
    const desired =
      remaining <= 0
        ? OVERDUE_LABEL
        : `T-${pad(Math.min(MAX_HOURS, Math.ceil(remaining / HOUR_MS)))}`;

    const state = {
      deadline: resolved.deadline,
      tracked: desired,
      declared: resolved.declared,
      declaration_event_id: resolved.declaration_event_id,
    };

    const stale = names.filter(
      (name) => (TN_RE.test(name) || name === OVERDUE_LABEL) && name !== desired
    );
    const needsLabel = stale.length > 0 || !names.includes(desired);

    console.log(
      `#${pr.number} ${current} → ${desired} | 마감 ${toKst(state.deadline)} | 선언 ${state.declared}`
    );

    if (DRY_RUN) continue;

    for (const name of stale) {
      await api(`/repos/${REPO}/issues/${pr.number}/labels/${encodeURIComponent(name)}`, {
        method: 'DELETE',
      });
    }

    if (!names.includes(desired)) {
      await api(`/repos/${REPO}/issues/${pr.number}/labels`, {
        method: 'POST',
        body: JSON.stringify({ labels: [desired] }),
      });
    }

    if (needsLabel) updated += 1;

    if (JSON.stringify(previous) !== JSON.stringify(state)) {
      const path = marker
        ? `/repos/${REPO}/issues/comments/${marker.id}`
        : `/repos/${REPO}/issues/${pr.number}/comments`;
      await api(path, {
        method: marker ? 'PATCH' : 'POST',
        body: JSON.stringify({ body: renderComment(state) }),
      });
    }
  }

  console.log(DRY_RUN ? '(dry run) 변경하지 않았습니다.' : `라벨 ${updated}건 갱신했습니다.`);
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
