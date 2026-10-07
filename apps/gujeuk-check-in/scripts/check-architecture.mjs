import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const rootDir = process.cwd();
const sourceDir = path.join(rootDir, 'src');
const sourceExtensions = new Set(['.js', '.jsx', '.ts', '.tsx']);

const knownWarningImports = new Set([
  'src/widgets/purpose/ui/PurposeBoard.tsx:8',
  'src/widgets/purpose/ui/PurposeBoard.tsx:14',
  'src/widgets/visit/ui/UserVisitDetail.tsx:4',
  'src/widgets/visit/ui/VisitForm.tsx:8',
  'src/widgets/visit/ui/VisitForm.tsx:11',
  'src/widgets/user/userSearch/UserListSearch.tsx:9',
  'src/widgets/admin-header/ui/AdminHeader.tsx:2',
  'src/entities/user/ui/UserInformationDetailCard.tsx:5',
  'src/features/visit/update-visit-list/ui/UserVisitForm.tsx:5',
  'src/features/visit/update-visit-list/ui/UserVisitForm.tsx:10',
  'src/features/auth/login/ui/LoginForm.tsx:6',
]);

const checkInPages = [
  'src/pages/check-in/CheckInSignupFormPage.tsx',
  'src/pages/check-in/CheckInLoginFormPage.tsx',
  'src/pages/check-in/CheckInUserCheck.tsx',
  'src/pages/check-in/CheckInFunnelAnalyticsPage.tsx',
];

const hardRules = [
  {
    name: 'layout-regression',
    message:
      'Do not reintroduce GlobalLayout/PageLayout in src; use the existing app layout boundary.',
    test: ({ line }) => /@widgets\/GlobalLayout|\bGlobalLayout\b|\bPageLayout\b/.test(line),
  },
  {
    name: 'unsafe-typescript-escape',
    message: 'Do not add any/ts-ignore/ts-expect-error escape hatches in src.',
    test: ({ line }) => /:\s*any\b|\bas\s+any\b|@ts-ignore|@ts-expect-error/.test(line),
  },
  {
    name: 'lower-layer-app-import',
    message: 'pages/widgets/features/entities must not import @app.',
    test: ({ relativePath, line }) =>
      !relativePath.startsWith('src/app/') &&
      /from\s+['"]@app(?:\/|['"])/.test(line),
  },
  {
    name: 'scoped-index-import-regression',
    message:
      'Do not reintroduce removed user/visit/residence index imports outside known G004 inventory.',
    test: ({ relativePath, lineNumber, line }) =>
      !knownWarningImports.has(`${relativePath}:${lineNumber}`) &&
      /from\s+['"](?:@entities|@features)\/(?:user|visit|residence)\/index['"]/.test(
        line
      ),
  },
  {
    name: 'relative-index-import-regression',
    message:
      'Do not reintroduce relative index imports in the scoped app/pages/widgets/features/entities layers.',
    test: ({ relativePath, line }) =>
      /^(src\/app|src\/pages|src\/widgets|src\/features|src\/entities)\//.test(
        relativePath
      ) && /from\s+['"](?:\.\/index|\.\.\/index)['"]/.test(line),
  },
  {
    name: 'app-feature-deep-import-regression',
    message:
      'App layer must not import feature deep model/ui modules; compose widgets or feature public APIs.',
    test: ({ relativePath, line }) =>
      relativePath.startsWith('src/app/') &&
      /from\s+['"]@features\/.*\/(?:model|ui)(?:\/|['"])/.test(line),
  },
];

const warningRules = [
  {
    name: 'known-g004-out-of-scope-import',
    message:
      'Known G004 out-of-scope public-index import; see .omx/ultragoal/g004-out-of-scope-deep-imports.md.',
    test: ({ relativePath, lineNumber }) =>
      knownWarningImports.has(`${relativePath}:${lineNumber}`),
  },
  {
    name: 'visit-feature-deep-import-inventory',
    message:
      'Existing visit feature deep import outside the scoped cleanup; keep inventoried until a targeted pass.',
    test: ({ relativePath, line }) =>
      /from\s+['"]@features\/visit\/.*\/(?:model|ui)(?:\/|['"])/.test(line),
  },
];

const toRelativePath = (filePath) => path.relative(rootDir, filePath).replaceAll(path.sep, '/');

const collectSourceFiles = async (directory) => {
  const entries = await readdir(directory);
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry);
    const entryStats = await stat(entryPath);

    if (entryStats.isDirectory()) {
      files.push(...(await collectSourceFiles(entryPath)));
      continue;
    }

    if (entryStats.isFile() && sourceExtensions.has(path.extname(entryPath))) {
      files.push(entryPath);
    }
  }

  return files;
};

const formatFinding = (finding) =>
  `${finding.relativePath}:${finding.lineNumber} [${finding.ruleName}] ${finding.message}\n  ${finding.line.trim()}`;

const run = async () => {
  const files = await collectSourceFiles(sourceDir);
  const hardFindings = [];
  const warningFindings = [];
  const lineCounts = new Map();

  for (const filePath of files) {
    const relativePath = toRelativePath(filePath);
    const content = await readFile(filePath, 'utf8');
    const lines = content === '' ? [] : content.replace(/\r?\n$/, '').split(/\r?\n/);
    lineCounts.set(relativePath, lines.length);

    lines.forEach((line, index) => {
      const lineNumber = index + 1;
      const context = { relativePath, lineNumber, line };

      for (const rule of hardRules) {
        if (rule.test(context)) {
          hardFindings.push({
            relativePath,
            lineNumber,
            line,
            ruleName: rule.name,
            message: rule.message,
          });
        }
      }

      for (const rule of warningRules) {
        if (rule.test(context)) {
          warningFindings.push({
            relativePath,
            lineNumber,
            line,
            ruleName: rule.name,
            message: rule.message,
          });
        }
      }
    });
  }

  console.log('Architecture scan: G006 guardrails');
  console.log(`Scanned ${files.length} source files under src.`);

  if (hardFindings.length > 0) {
    console.error('\nHard failures:');
    hardFindings.forEach((finding) => console.error(formatFinding(finding)));
  } else {
    console.log('\nHard failures: none');
  }

  if (warningFindings.length > 0) {
    console.log('\nKnown warnings / inventory:');
    warningFindings.forEach((finding) => console.log(formatFinding(finding)));
  } else {
    console.log('\nKnown warnings / inventory: none');
  }

  console.log('\nCheck-in page decomposition inventory:');
  for (const page of checkInPages) {
    const count = lineCounts.get(page);
    console.log(`- ${page}: ${count ?? 'missing'} lines`);
  }
  console.log(
    '- Purpose/residence boards retain duplicated CRUD/reorder/modal shape for a future scoped extraction; business logic stays out of shared.'
  );

  if (hardFindings.length > 0) {
    process.exitCode = 1;
  }
};

run().catch((error) => {
  console.error('Architecture scan failed to run.');
  console.error(error);
  process.exitCode = 1;
});
