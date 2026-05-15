import { build } from 'esbuild';
import { mkdirSync, existsSync, copyFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DIST_DIR = join(ROOT, 'dist');
const PUBLIC_DIR = join(ROOT, 'public');

if (!existsSync(DIST_DIR)) mkdirSync(DIST_DIR, { recursive: true });
if (!existsSync(PUBLIC_DIR)) mkdirSync(PUBLIC_DIR, { recursive: true });

const shared = {
  bundle: true,
  platform: 'browser' as const,
  target: 'es2020',
  sourcemap: true,
  minify: true,
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  jsx: 'automatic' as const,
};

async function main() {
  // UMD/IIFE — CDN bundle, auto-mount
  await build({
    ...shared,
    entryPoints: [join(ROOT, 'src/embed.ts')],
    outfile: join(DIST_DIR, 'embed.js'),
    format: 'iife',
    globalName: 'DailySoup',
  });

  // ESM — NPM
  await build({
    ...shared,
    entryPoints: [join(ROOT, 'src/index.ts')],
    outfile: join(DIST_DIR, 'embed.esm.js'),
    format: 'esm',
    minify: false,
  });

  // CJS — NPM
  await build({
    ...shared,
    entryPoints: [join(ROOT, 'src/index.ts')],
    outfile: join(DIST_DIR, 'embed.cjs.js'),
    format: 'cjs',
    minify: false,
  });

  // Copy CDN artefacts to public/ so Next.js serves them at /
  for (const name of ['embed.js', 'embed.esm.js']) {
    copyFileSync(join(DIST_DIR, name), join(PUBLIC_DIR, name));
  }
  for (const lang of ['zh', 'en']) {
    const src = join(DIST_DIR, `schedule-${lang}.json`);
    if (existsSync(src)) copyFileSync(src, join(PUBLIC_DIR, `schedule-${lang}.json`));
  }

  console.log('Built embed.js (IIFE), embed.esm.js (ESM), embed.cjs.js (CJS)');
  console.log('Copied bundles + schedules into public/');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
