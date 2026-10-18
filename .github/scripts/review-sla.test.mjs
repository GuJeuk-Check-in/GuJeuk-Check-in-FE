import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';

const source = await readFile(new URL('./review-sla.mjs', import.meta.url), 'utf8');
const now = Date.parse('2026-10-12T10:00:00Z');
const hour = 3_600_000;
const event = (id, name, ago, login = 'teammate') => ({
  id, event: 'labeled', label: { name }, actor: { login },
  created_at: new Date(now - ago * hour).toISOString(),
});

async function simulate({ labels = ['T-10'], events = [], previous, markerBody, dryRun = false, draft = false }) {
  const writes = [];
  class Clock extends Date { static now() { return now; } }
  await runInNewContext(source, {
    Date: Clock,
    console: { log() {}, error(error) { throw error; } },
    process: { env: { GITHUB_TOKEN: 'mock', GITHUB_REPOSITORY: 'team/repo', DRY_RUN: String(dryRun) }, exit() { throw Error('exit'); } },
    fetch: async (url, init = {}) => {
      const method = init.method ?? 'GET';
      if (method !== 'GET') {
        writes.push({ method, url, body: init.body && JSON.parse(init.body) });
        return { ok: true, status: 204 };
      }
      const data = url.includes('/pulls?')
        ? [{ number: 1, draft, created_at: new Date(now - 20 * hour).toISOString(), labels: labels.map(name => ({ name })) }]
        : url.includes('/comments?')
          ? markerBody !== undefined || previous
            ? [{ id: 99, body: markerBody ?? `<!-- review-sla ${JSON.stringify(previous)} -->` }]
            : []
          : events;
      return { ok: true, status: 200, json: async () => data };
    },
  });
  return writes;
}
const stateOf = writes => JSON.parse(writes.find(w => w.body?.body)?.body.body.match(/<!-- review-sla (.*?) -->/)[1]);

test('late attachment starts at attachment time, not PR creation', async () => {
  const writes = await simulate({ events: [event(1, 'T-10', 2.5)] });
  const state = stateOf(writes);
  assert.equal(state.tracked, 'T-08');
  assert.equal(state.deadline, new Date(now + 7.5 * hour).toISOString());
});
test('manual redeclaration uses event time, even for the same label', async () => {
  const previous = { tracked: 'T-10', declared: 'T-10', deadline: new Date(now + hour).toISOString(), declaration_event_id: 1 };
  const state = stateOf(await simulate({ previous, events: [event(1, 'T-10', 9), event(2, 'T-10', 2)] }));
  assert.equal(state.deadline, new Date(now + 8 * hour).toISOString());
  assert.equal(state.declaration_event_id, 2);
});
test('bot countdown preserves deadline and original declaration', async () => {
  const previous = { tracked: 'T-08', declared: 'T-10', deadline: new Date(now + 6.5 * hour).toISOString(), declaration_event_id: 1 };
  const state = stateOf(await simulate({ labels: ['T-08'], previous, events: [event(1, 'T-10', 3.5), event(2, 'T-08', 1, 'github-actions[bot]')] }));
  assert.equal(state.tracked, 'T-07');
  assert.equal(state.deadline, previous.deadline);
  assert.equal(state.declared, 'T-10');
});
test('delayed execution marks elapsed deadline overdue', async () => {
  assert.equal(stateOf(await simulate({ labels: ['T-02'], events: [event(1, 'T-02', 4)] })).tracked, 'review-overdue');
});
test('dry run and draft PRs perform no writes', async () => {
  assert.equal((await simulate({ events: [event(1, 'T-10', 2)], dryRun: true })).length, 0);
  assert.equal((await simulate({ events: [event(1, 'T-10', 2)], draft: true })).length, 0);
});
test('multiple labels select the smallest T value', async () => {
  const writes = await simulate({ labels: ['T-12', 'T-04'], events: [event(1, 'T-12', 1), event(2, 'T-04', 1)] });
  assert.equal(stateOf(writes).tracked, 'T-03');
  assert.equal(writes.filter(w => w.method === 'DELETE').length, 2);
});

test('unchanged state performs no writes', async () => {
  const previous = { deadline: new Date(now + 8 * hour).toISOString(), tracked: 'T-08', declared: 'T-10', declaration_event_id: 1 };
  assert.equal((await simulate({ labels: ['T-08'], previous, events: [event(2, 'T-08', 1, 'github-actions[bot]')] })).length, 0);
});
test('overdue state stays overdue without a new declaration', async () => {
  const previous = { deadline: new Date(now - hour).toISOString(), tracked: 'review-overdue', declared: 'T-10', declaration_event_id: 1 };
  assert.equal((await simulate({ labels: ['review-overdue'], previous })).length, 0);
});
test('broken marker JSON is repaired using the attachment event', async () => {
  const writes = await simulate({ markerBody: '<!-- review-sla {broken} -->', events: [event(1, 'T-10', 2)] });
  assert.equal(stateOf(writes).tracked, 'T-08');
  assert.equal(writes.find(w => w.body?.body).method, 'PATCH');
});
test('legacy marker without declared uses the current label', async () => {
  const previous = { deadline: new Date(now + 6 * hour).toISOString(), tracked: 'T-08' };
  const state = stateOf(await simulate({ labels: ['T-08'], previous, events: [event(2, 'T-08', 1, 'github-actions[bot]')] }));
  assert.equal(state.deadline, previous.deadline);
  assert.equal(state.declared, 'T-08');
});
test('PRs without SLA labels or without an initial attachment event are skipped', async () => {
  assert.equal((await simulate({ labels: ['feat'] })).length, 0);
  assert.equal((await simulate({ events: [] })).length, 0);
});
