import { readdirSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

const __dirname = dirname(fileURLToPath(import.meta.url));
const QUOTES_DIR = join(__dirname, '..', 'content', 'quotes');

interface CheckResult {
  file: string;
  url: string;
  status: number | 'error';
  ok: boolean;
}

async function checkUrl(url: string): Promise<{ status: number | 'error'; ok: boolean }> {
  try {
    const res = await fetch(url, { method: 'GET', redirect: 'follow' });
    if (!res.ok) return { status: res.status, ok: false };
    const body = await res.text();
    const looksDeleted = /資料已刪除|該資料已刪除|頁面不存在|404 Not Found/i.test(body);
    return { status: res.status, ok: !looksDeleted };
  } catch {
    return { status: 'error', ok: false };
  }
}

async function main() {
  const files = readdirSync(QUOTES_DIR).filter((f) => f.endsWith('.md'));
  const targets: { file: string; url: string }[] = [];
  for (const file of files) {
    const raw = readFileSync(join(QUOTES_DIR, file), 'utf8');
    const fm = matter(raw).data as { sourceUrl?: string };
    if (fm.sourceUrl && fm.sourceUrl.trim() !== '') {
      targets.push({ file, url: fm.sourceUrl });
    }
  }
  console.log(`Checking ${targets.length} URLs...`);
  const results: CheckResult[] = [];
  for (const { file, url } of targets) {
    const { status, ok } = await checkUrl(url);
    results.push({ file, url, status, ok });
    console.log(`  [${ok ? 'OK ' : 'BAD'}] ${status}  ${file}  ${url}`);
  }
  const bad = results.filter((r) => !r.ok);
  console.log(`\n${bad.length} broken / ${results.length} checked`);
  if (bad.length > 0) {
    console.log('\nBroken URLs (set sourceUrl: "" in these files):');
    for (const r of bad) console.log(`  ${r.file}`);
    process.exit(1);
  }
}

main();
