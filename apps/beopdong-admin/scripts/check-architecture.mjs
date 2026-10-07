import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const rootDir = process.cwd();
const sourceDir = path.join(rootDir, 'src');
const sourceExtensions = new Set(['.js', '.jsx', '.ts', '.tsx']);

const hardRules = [
  {
    name: 'unsafe-typescript-escape',
    message: 'Do not add any/ts-ignore/ts-expect-error escape hatches in src.',
    test: ({ line }) => /:\s*any\b|\bas\s+any\b|@ts-ignore|@ts-expect-error/.test(line),
  },
  {
    name: 'gujeuk-coupling',
    message: 'Beopdong admin must not import or mention GuJeuk app internals.',
    test: ({ line }) => /gujeuk|구즉|@gujeuk\/gujeuk/i.test(line),
  },
  {
    name: 'check-in-surface',
    message: 'Beopdong check-in belongs to the app project, not this web admin app.',
    test: ({ line }) => /check-in|checkIn|체크인/.test(line),
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

  for (const filePath of files) {
    const relativePath = toRelativePath(filePath);
    const content = await readFile(filePath, 'utf8');
    const lines = content === '' ? [] : content.replace(/\r?\n$/, '').split(/\r?\n/);

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
    });
  }

  console.log('Architecture scan: Beopdong admin guardrails');
  console.log(`Scanned ${files.length} source files under src.`);

  if (hardFindings.length > 0) {
    console.error('\nHard failures:');
    hardFindings.forEach((finding) => console.error(formatFinding(finding)));
    process.exitCode = 1;
    return;
  }

  console.log('\nHard failures: none');
  console.log('- Beopdong admin remains a minimal web-only app boundary.');
};

run().catch((error) => {
  console.error('Architecture scan failed to run.');
  console.error(error);
  process.exitCode = 1;
});
