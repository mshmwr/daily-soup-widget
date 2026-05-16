import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const QUOTES_DIR = join(ROOT, 'content', 'quotes');
const DIST_DIR = join(ROOT, 'dist');

const LAUNCH_DATE = '2026-05-15';
const FORWARD_DAYS = 90;

type Lang = 'zh';

interface QuoteFrontmatter {
  id: string;
  lang: Lang;
  author: string;
  source: string;
  sourceUrl?: string;
  attribution: 'verified' | 'popular-attribution' | 'proverb';
  dimension: 'action' | 'learning' | 'perseverance' | 'mindset' | 'transformation' | 'purpose';
  style: 'classical' | 'vernacular' | 'semi-vernacular' | 'poetry' | 'modern';
}

interface Quote {
  id: string;
  lang: Lang;
  text: string;
  author: string;
  source: string;
  sourceUrl: string;
  attribution: string;
  dimension: string;
  style: string;
}

interface Schedule {
  launchDate: string;
  generatedAt: string;
  lang: Lang;
  entries: Record<string, string>;
  quotes: Record<string, Omit<Quote, 'id' | 'lang'>>;
}

function loadQuotes(): Quote[] {
  const files = readdirSync(QUOTES_DIR).filter((f) => f.endsWith('.md'));
  return files.map((file) => {
    const raw = readFileSync(join(QUOTES_DIR, file), 'utf8');
    const parsed = matter(raw);
    const fm = parsed.data as QuoteFrontmatter;
    if (!fm.id || !fm.lang) {
      throw new Error(`Missing id or lang in ${file}`);
    }
    return {
      id: fm.id,
      lang: fm.lang,
      text: parsed.content.trim(),
      author: fm.author,
      source: fm.source,
      sourceUrl: fm.sourceUrl ?? '',
      attribution: fm.attribution,
      dimension: fm.dimension,
      style: fm.style,
    };
  });
}

function addDays(dateIso: string, days: number): string {
  const parts = dateIso.split('-').map(Number);
  const y = parts[0]!;
  const m = parts[1]!;
  const d = parts[2]!;
  const dt = new Date(Date.UTC(y, m - 1, d));
  dt.setUTCDate(dt.getUTCDate() + days);
  const yy = dt.getUTCFullYear();
  const mm = String(dt.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(dt.getUTCDate()).padStart(2, '0');
  return `${yy}-${mm}-${dd}`;
}

function todayUtc8(): string {
  const now = new Date();
  const utc8 = new Date(now.getTime() + 8 * 60 * 60 * 1000);
  const yy = utc8.getUTCFullYear();
  const mm = String(utc8.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(utc8.getUTCDate()).padStart(2, '0');
  return `${yy}-${mm}-${dd}`;
}

function loadExistingSchedule(lang: Lang): Schedule | null {
  const file = join(DIST_DIR, `schedule-${lang}.json`);
  if (!existsSync(file)) return null;
  try {
    return JSON.parse(readFileSync(file, 'utf8')) as Schedule;
  } catch {
    return null;
  }
}

export function buildSchedule(
  lang: Lang,
  allQuotes: Quote[],
  options: { launchDate?: string; today?: string; forwardDays?: number; existing?: Schedule | null } = {},
): Schedule {
  const launchDate = options.launchDate ?? LAUNCH_DATE;
  const today = options.today ?? todayUtc8();
  const forwardDays = options.forwardDays ?? FORWARD_DAYS;
  const existing = options.existing ?? null;

  const pool = allQuotes.filter((q) => q.lang === lang).sort((a, b) => a.id.localeCompare(b.id));
  if (pool.length === 0) {
    throw new Error(`No quotes found for lang=${lang}`);
  }

  const entries: Record<string, string> = existing?.entries ? { ...existing.entries } : {};
  const lastDate = addDays(today, forwardDays);

  let cursor = launchDate;
  let rotationIndex = 0;

  while (cursor <= lastDate) {
    if (!(cursor in entries)) {
      const quote = pool[rotationIndex % pool.length]!;
      entries[cursor] = quote.id;
    }
    rotationIndex += 1;
    cursor = addDays(cursor, 1);
  }

  const quotesMap: Record<string, Omit<Quote, 'id' | 'lang'>> = {};
  for (const q of pool) {
    quotesMap[q.id] = {
      text: q.text,
      author: q.author,
      source: q.source,
      sourceUrl: q.sourceUrl,
      attribution: q.attribution,
      dimension: q.dimension,
      style: q.style,
    };
  }

  return {
    launchDate,
    generatedAt: new Date().toISOString(),
    lang,
    entries,
    quotes: quotesMap,
  };
}

function main() {
  if (!existsSync(DIST_DIR)) {
    mkdirSync(DIST_DIR, { recursive: true });
  }

  const quotes = loadQuotes();
  console.log(`Loaded ${quotes.length} quotes from ${QUOTES_DIR}`);

  for (const lang of ['zh'] as const) {
    const existing = loadExistingSchedule(lang);
    const schedule = buildSchedule(lang, quotes, { existing });
    const outFile = join(DIST_DIR, `schedule-${lang}.json`);
    writeFileSync(outFile, JSON.stringify(schedule, null, 2));
    const poolSize = Object.keys(schedule.quotes).length;
    const dayCount = Object.keys(schedule.entries).length;
    console.log(`  ${lang}: ${poolSize} quotes, ${dayCount} dates → ${outFile}`);
  }
}

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (isMain) {
  main();
}

export type { Quote, Schedule, Lang };
export { loadQuotes };
