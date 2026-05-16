# Daily Soup Widget

Embeddable daily-quote widget. Drop a `<script>` tag on any website, or `npm install` it as a React component. Same deterministic quote everywhere, every day — growth-themed, copyright-safe, zero config.

- **Live demo:** https://daily-soup-widget.vercel.app
- **Source:** https://github.com/mshmwr/daily-soup-widget
- **License:** MIT

---

## Why this exists

A widget shaped like an answer to three questions at once:

1. **Technical practice** — Shadow DOM, UMD bundle, container queries, dual NPM/CDN distribution.
2. **Portfolio piece** — a shipped end-to-end embeddable tool with a hosted live demo.
3. **Future product** — v1 is intentionally small so v2 (analytics, personalisation, monetisation) has room.

The content theme is 人生成長 (personal growth). 30 zh seed quotes ship in v0.2; one per day, deterministically scheduled by UTC+8 date. Past dates never change once published. **v0.2 is zh-only** — the earlier en pool was removed in favour of a larger zh repertoire.

---

## Install — script tag (any website)

```html
<div id="daily-soup"></div>
<script src="https://daily-soup-widget.vercel.app/embed.js" async></script>
```

Optional config via `data-*` attributes:

```html
<div data-daily-soup data-theme="dark" data-max-width="640px"></div>
```

Multiple instances on one page are supported — the bundle auto-mounts every `[data-daily-soup]` and `#daily-soup` node it finds.

## Install — NPM (React / Next.js)

```bash
npm install daily-soup-widget
```

```tsx
import { DailySoup } from 'daily-soup-widget';

export default function Page() {
  return <DailySoup lang="zh" theme="auto" />;
}
```

The component is SSR-safe: it emits a placeholder during render and hydrates the widget inside `useEffect`. No `window` access at module top-level.

## Install — framework-agnostic ESM

```ts
import { mount } from 'daily-soup-widget';

const host = document.querySelector('#my-mount-point') as HTMLElement;
const handle = mount(host, { lang: 'zh', theme: 'auto' });
// later: handle.destroy();
```

---

## Configuration

| Option        | Values                                            | Default                                | Description                                                       |
| ------------- | ------------------------------------------------- | -------------------------------------- | ----------------------------------------------------------------- |
| `lang`        | `'zh'`                                            | `'zh'`                                 | Content language. zh-only since v0.2.                             |
| `theme`       | `'auto'` / `'light'` / `'dark'` / color object    | `'auto'`                               | `auto` follows host's `prefers-color-scheme` and reacts to changes. Pass an object to override colors — see below. |
| `scheduleUrl` | any HTTPS URL or `''` (same-origin)               | `https://daily-soup-widget.vercel.app` | Override the CDN that serves `/schedule-<lang>.json`.             |
| `maxWidth`    | any valid CSS width (e.g. `'100%'`, `'48rem'`)    | `'32rem'`                              | Cap on the card's rendered width. Set to `'100%'` to fill the embed container. |

### Theme as object

For a quick palette tweak without a full restyle, pass an object instead of a string:

```tsx
<DailySoup
  theme={{ base: 'light', bg: '#fff8ee', border: 'transparent' }}
  maxWidth="100%"
/>
```

Recognised keys: `base` (`'light'` | `'dark'`, controls default vars before overrides), `bg`, `ink`, `muted`, `border`, `accent`. Any omitted key falls back to the `base` palette. Object themes do **not** follow system preference — they're explicit.

CDN attribute support is string-only — use `data-theme="auto|light|dark"` and `data-max-width="..."`. The object form requires the NPM API.

Container queries still apply for layout. Three breakpoints: <320px (icon-only share row), 320–500px (standard), 500–700px (larger quote), >700px (comfortable spacing). The card never exceeds `maxWidth`.

---

## How "today" is decided

`schedule-<lang>.json` ships as a static JSON file mapping calendar date → quote ID:

```json
{
  "launchDate": "2026-05-15",
  "entries": {
    "2026-05-15": "0001",
    "2026-05-16": "0003"
  },
  "quotes": { "0001": { "text": "...", "author": "..." } }
}
```

The client fetches one JSON, computes today's UTC+8 date, looks up the entry, and renders. **No second request. No cold start. No personalisation.** Past dates carry permanent content even if the quote pool reshuffles.

A GitHub Actions cron (monthly, day 1 at 16:00 UTC) regenerates the JSON to extend the rolling 90-day window and redeploys. New quotes appended to the pool extend the rotation tail; existing schedule slots stay untouched.

---

## What's in the box

- **30 zh seed quotes** spanning five growth dimensions: 行動 / 學習 / 堅持 / 心態 / 蛻變.
- All classical Chinese — 蘇軾、屈原、論語、孟子、莊子、荀子、王勃、杜甫、陸游、朱熹 等.
- **Copyright posture:** all public-domain (Taiwan 50-year rule). Each quote carries author + source attribution with a 出處 link.

Browse `content/quotes/*.md` to see the seed. Adding a quote = one PR per markdown file.

---

## Repository layout

```
content/quotes/         hand-curated markdown quotes (the source of truth)
scripts/
  build-schedule.ts     content/*.md → dist/schedule-zh.json
  build-bundle.ts       esbuild UMD + ESM + CJS bundles
src/
  embed.ts              UMD entry (CDN, auto-mounts)
  index.ts              ESM entry (NPM)
  component.tsx         React wrapper
  widget.ts             framework-agnostic core (Shadow DOM, render, fetch)
  theme.ts              auto/light/dark resolution + system-theme listener
  i18n.ts               UI strings (zh)
  share.ts              copy / X / LINE share builders
  styles.ts             widget CSS (injected into Shadow DOM)
app/                    Next.js landing page (live demo + install snippets)
tests/
  unit/                 Vitest — build-schedule, theme, i18n, date
  e2e/                  Playwright — landing page smoke
```

---

## Local development

```bash
npm install
npm run build:schedule     # content/quotes/*.md → dist/schedule-*.json
npm run build:bundle       # esbuild UMD + ESM + CJS into dist/ + public/
npm run dev                # next dev — landing page at http://localhost:3000
npm test                   # vitest
npm run test:e2e           # playwright (requires running dev server)
npm run typecheck          # tsc --noEmit
npm run build              # full prod build (schedule + bundle + types + Next.js)
```

### Adding a quote

1. Create `content/quotes/<id>-<slug>.md` with frontmatter (see existing files for the schema).
2. `npm run build:schedule` — extends the schedule, preserving past dates.
3. Commit + PR. Merge triggers the GH Action to redeploy.

---

## Browser support

- Modern evergreens (Chrome / Safari / Firefox / Edge), 2022+.
- Container queries: Chrome 105+ / Safari 16+ / Firefox 110+. The widget renders without RWD on older browsers (fixed-size card).
- Shadow DOM fallback: light-DOM render with a console warning.

---

## License

MIT © 2026 mshmwr. See [`LICENSE`](./LICENSE).

Quote sources are public-domain or PD-in-Taiwan; see frontmatter on each quote file for attribution.
