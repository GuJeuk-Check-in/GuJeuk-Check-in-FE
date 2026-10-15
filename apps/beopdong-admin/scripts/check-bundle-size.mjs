import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const rootDir = process.cwd();
const distAssetsDir = path.join(rootDir, 'dist', 'assets');
const maxJsChunkBytes = 500 * 1024;

const collectJsFiles = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await collectJsFiles(entryPath)));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith('.js')) {
      files.push(entryPath);
    }
  }

  return files;
};

const formatKiB = (bytes) => `${(bytes / 1024).toFixed(2)} KiB`;

const run = async () => {
  const jsFiles = await collectJsFiles(distAssetsDir);
  const oversizedChunks = [];

  for (const filePath of jsFiles) {
    const fileStats = await stat(filePath);

    if (fileStats.size > maxJsChunkBytes) {
      oversizedChunks.push({
        relativePath: path.relative(rootDir, filePath).replaceAll(path.sep, '/'),
        size: fileStats.size,
      });
    }
  }

  if (oversizedChunks.length === 0) {
    console.log(
      `Bundle guard passed: ${jsFiles.length} JS chunks are <= ${formatKiB(
        maxJsChunkBytes
      )}.`
    );
    return;
  }

  console.error(
    `Bundle guard failed: JS chunks must be <= ${formatKiB(maxJsChunkBytes)}.`
  );
  oversizedChunks.forEach((chunk) => {
    console.error(`- ${chunk.relativePath}: ${formatKiB(chunk.size)}`);
  });
  process.exitCode = 1;
};

run().catch((error) => {
  console.error('Bundle guard failed to inspect dist assets.');
  console.error(error);
  process.exitCode = 1;
});
