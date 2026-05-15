import type { Lang, MountOptions, Quote, ResolvedTheme, Schedule, ThemeConfig } from './types';
import { t } from './i18n';
import { resolveTheme, watchSystemTheme } from './theme';
import { buildLineShareUrl, buildXShareUrl, copyToClipboard } from './share';
import { WIDGET_STYLES } from './styles';
import { todayUtc8 } from './date';

const DEFAULT_SCHEDULE_BASE = 'https://daily-soup-widget.vercel.app';

export interface MountHandle {
  destroy(): void;
}

interface WidgetState {
  lang: Lang;
  themeConfig: ThemeConfig;
  scheduleUrl: string;
  host: HTMLElement;
  root: ShadowRoot | HTMLElement;
  cardEl: HTMLElement;
  unwatchTheme: () => void;
}

function escape(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function attachRoot(host: HTMLElement): ShadowRoot | HTMLElement {
  if (typeof host.attachShadow === 'function') {
    if (host.shadowRoot) return host.shadowRoot;
    return host.attachShadow({ mode: 'open' });
  }
  console.warn('[daily-soup] attachShadow unsupported, falling back to light DOM');
  return host;
}

function injectStyles(root: ShadowRoot | HTMLElement) {
  const style = document.createElement('style');
  style.textContent = WIDGET_STYLES;
  root.appendChild(style);
}

function buildSkeleton(theme: ResolvedTheme): HTMLElement {
  const card = document.createElement('div');
  card.className = `ds-card ds-${theme} ds-skeleton`;
  card.innerHTML = `
    <div class="ds-quote">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
    <div class="ds-meta"><span class="ds-author">&nbsp;</span><span class="ds-source">&nbsp;</span></div>
  `;
  return card;
}

function renderQuote(card: HTMLElement, quote: Quote, lang: Lang, theme: ResolvedTheme) {
  const s = t(lang);
  card.className = `ds-card ds-${theme}`;
  const sourceLabel = quote.sourceUrl
    ? `<a href="${escape(quote.sourceUrl)}" target="_blank" rel="noopener noreferrer">${escape(quote.source)}</a>`
    : escape(quote.source);
  const flag = quote.attribution === 'popular-attribution'
    ? `<span class="ds-flag">${escape(s.attributedPopular)}</span>`
    : '';
  card.innerHTML = `
    <p class="ds-quote">${escape(quote.text)}</p>
    <div class="ds-meta">
      <span class="ds-author">— ${escape(quote.author)}${flag}</span>
      ${quote.source ? `<span class="ds-source">${s.source}：${sourceLabel}</span>` : ''}
    </div>
    <div class="ds-actions">
      <div class="ds-share">
        <button class="ds-btn" data-action="copy" type="button" aria-label="${escape(s.copy)}">
          <span aria-hidden="true">⧉</span><span class="ds-share-label">${escape(s.copy)}</span>
        </button>
        <a class="ds-btn" data-action="x" href="${escape(buildXShareUrl({ text: quote.text, author: quote.author }))}" target="_blank" rel="noopener noreferrer" aria-label="${escape(s.shareX)}">
          <span aria-hidden="true">𝕏</span><span class="ds-share-label">X</span>
        </a>
        <a class="ds-btn" data-action="line" href="${escape(buildLineShareUrl({ text: quote.text, author: quote.author }))}" target="_blank" rel="noopener noreferrer" aria-label="${escape(s.shareLine)}">
          <span aria-hidden="true">L</span><span class="ds-share-label">LINE</span>
        </a>
      </div>
      <span class="ds-powered"><a href="https://personal-site-mocha-chi.vercel.app" target="_blank" rel="noopener noreferrer">${s.poweredBy}</a></span>
    </div>
  `;

  const copyBtn = card.querySelector<HTMLButtonElement>('[data-action="copy"]');
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const ok = await copyToClipboard({ text: quote.text, author: quote.author });
      if (ok) {
        const label = copyBtn.querySelector('.ds-share-label');
        const originalLabel = label?.textContent ?? '';
        if (label) label.textContent = s.copied;
        copyBtn.classList.add('ds-toast');
        setTimeout(() => {
          if (label) label.textContent = originalLabel;
          copyBtn.classList.remove('ds-toast');
        }, 2000);
      }
    });
  }
}

function renderError(card: HTMLElement, lang: Lang, theme: ResolvedTheme) {
  card.className = `ds-card ds-${theme}`;
  const s = t(lang);
  card.innerHTML = `<p class="ds-error">${escape(s.loadFailed)}</p>`;
}

async function fetchSchedule(scheduleUrl: string, lang: Lang): Promise<Schedule | null> {
  const base = scheduleUrl.replace(/\/$/, '');
  const url = `${base}/schedule-${lang}.json`;
  try {
    const init: RequestInit = base === '' ? { credentials: 'omit' } : { credentials: 'omit', mode: 'cors' };
    const res = await fetch(url, init);
    if (!res.ok) return null;
    return (await res.json()) as Schedule;
  } catch {
    return null;
  }
}

function pickQuote(schedule: Schedule): Quote | null {
  const today = todayUtc8();
  const id = schedule.entries[today];
  if (id && schedule.quotes[id]) return schedule.quotes[id];
  const fallbackId = Object.keys(schedule.quotes).sort()[0];
  if (fallbackId && schedule.quotes[fallbackId]) {
    console.warn('[daily-soup] today entry missing or stale, falling back to first quote');
    return schedule.quotes[fallbackId];
  }
  return null;
}

export function mount(host: HTMLElement, options: MountOptions = {}): MountHandle {
  const lang: Lang = options.lang ?? 'zh';
  const themeConfig: ThemeConfig = options.theme ?? 'auto';
  const scheduleUrl = options.scheduleUrl === undefined ? DEFAULT_SCHEDULE_BASE : options.scheduleUrl;

  let resolvedTheme = resolveTheme(themeConfig);
  const root = attachRoot(host);
  if (root === host) {
    // light DOM fallback — clear any prior content
    host.textContent = '';
  } else {
    while ((root as ShadowRoot).firstChild) (root as ShadowRoot).removeChild((root as ShadowRoot).firstChild!);
  }
  injectStyles(root);

  const card = buildSkeleton(resolvedTheme);
  root.appendChild(card);

  const state: WidgetState = {
    lang,
    themeConfig,
    scheduleUrl,
    host,
    root,
    cardEl: card,
    unwatchTheme: () => {},
  };

  if (themeConfig === 'auto') {
    state.unwatchTheme = watchSystemTheme((t) => {
      resolvedTheme = t;
      state.cardEl.classList.remove('ds-light', 'ds-dark');
      state.cardEl.classList.add(`ds-${t}`);
    });
  }

  let cancelled = false;
  let retried = false;

  const load = async () => {
    const schedule = await fetchSchedule(scheduleUrl, lang);
    if (cancelled) return;
    if (!schedule) {
      if (!retried) {
        retried = true;
        setTimeout(load, 2000);
        return;
      }
      renderError(state.cardEl, lang, resolvedTheme);
      return;
    }
    const quote = pickQuote(schedule);
    if (!quote) {
      renderError(state.cardEl, lang, resolvedTheme);
      return;
    }
    renderQuote(state.cardEl, quote, lang, resolvedTheme);
  };
  load();

  return {
    destroy() {
      cancelled = true;
      state.unwatchTheme();
      if (root === host) {
        host.textContent = '';
      } else if (host.shadowRoot) {
        while (host.shadowRoot.firstChild) host.shadowRoot.removeChild(host.shadowRoot.firstChild);
      }
    },
  };
}

export function mountAll(selector = '[data-daily-soup], #daily-soup'): MountHandle[] {
  if (typeof document === 'undefined') return [];
  const nodes = document.querySelectorAll<HTMLElement>(selector);
  const handles: MountHandle[] = [];
  nodes.forEach((node) => {
    const lang = (node.dataset.lang as Lang | undefined) ?? 'zh';
    const theme = (node.dataset.theme as ThemeConfig | undefined) ?? 'auto';
    const scheduleUrl = node.dataset.scheduleUrl;
    handles.push(mount(node, { lang, theme, scheduleUrl }));
  });
  return handles;
}
