import { useCallback, useEffect, useState } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { flushSync } from 'react-dom';
import type { Lang, MountOptions, Quote, ResolvedTheme, Schedule, ThemeConfig } from './types';
import { t } from './i18n';
import { resolveTheme, watchSystemTheme, getThemeColors } from './theme';
import { buildLineShareUrl, buildXShareUrl, copyToClipboard } from './share';
import { WIDGET_STYLES } from './styles';
import { todayUtc8 } from './date';

const DEFAULT_SCHEDULE_BASE = 'https://daily-soup-widget.vercel.app';

export interface MountHandle {
  destroy(): void;
}

interface WidgetProps {
  lang: Lang;
  themeConfig: ThemeConfig;
  scheduleUrl: string;
  maxWidth?: string;
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

function pickQuote(schedule: Schedule, today: string): Quote | null {
  const id = schedule.entries[today];
  if (id && schedule.quotes[id]) return schedule.quotes[id];
  const fallbackId = Object.keys(schedule.quotes).sort()[0];
  if (fallbackId && schedule.quotes[fallbackId]) {
    console.warn('[daily-soup] today entry missing or stale, falling back to first quote');
    return schedule.quotes[fallbackId];
  }
  return null;
}

function buildInlineStyle(themeConfig: ThemeConfig, maxWidth?: string): React.CSSProperties {
  const style: Record<string, string> = {};
  const colors = getThemeColors(themeConfig);
  if (colors) {
    if (colors.bg) style['--ds-bg'] = colors.bg;
    if (colors.ink) style['--ds-fg'] = colors.ink;
    if (colors.muted) style['--ds-muted'] = colors.muted;
    if (colors.border) style['--ds-border'] = colors.border;
    if (colors.accent) style['--ds-accent'] = colors.accent;
  }
  if (maxWidth) style['--ds-max-width'] = maxWidth;
  return style as React.CSSProperties;
}

function DailySoupWidget({ lang, themeConfig, scheduleUrl, maxWidth }: WidgetProps) {
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() => resolveTheme(themeConfig));
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [displayedDate, setDisplayedDate] = useState<string>('');
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);
  const [copyToast, setCopyToast] = useState(false);

  useEffect(() => {
    if (themeConfig !== 'auto') {
      setResolvedTheme(resolveTheme(themeConfig));
      return;
    }
    setResolvedTheme(resolveTheme(themeConfig));
    return watchSystemTheme(setResolvedTheme);
  }, [themeConfig]);

  useEffect(() => {
    let cancelled = false;
    let retried = false;

    const load = async () => {
      const sch = await fetchSchedule(scheduleUrl, lang);
      if (cancelled) return;
      if (!sch) {
        if (!retried) {
          retried = true;
          setTimeout(load, 2000);
          return;
        }
        setLoadFailed(true);
        return;
      }
      const today = todayUtc8();
      const q = pickQuote(sch, today);
      if (!q) {
        setLoadFailed(true);
        return;
      }
      flushSync(() => {
        setSchedule(sch);
        setDisplayedDate(today);
        setQuote(q);
      });
    };
    load();

    return () => {
      cancelled = true;
    };
  }, [lang, scheduleUrl]);

  useEffect(() => {
    if (!schedule || typeof document === 'undefined') return;
    const onVisibility = () => {
      if (document.visibilityState !== 'visible') return;
      const today = todayUtc8();
      if (today === displayedDate) return;
      const q = pickQuote(schedule, today);
      if (!q) return;
      flushSync(() => {
        setDisplayedDate(today);
        setQuote(q);
      });
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, [schedule, displayedDate]);

  const inlineStyle = buildInlineStyle(themeConfig, maxWidth);
  const s = t(lang);

  const handleCopy = useCallback(async () => {
    if (!quote) return;
    const ok = await copyToClipboard({ text: quote.text, author: quote.author });
    if (ok) {
      setCopyToast(true);
      setTimeout(() => setCopyToast(false), 2000);
    }
  }, [quote]);

  if (loadFailed) {
    return (
      <>
        <style>{WIDGET_STYLES}</style>
        <div className={`ds-card ds-${resolvedTheme}`} style={inlineStyle}>
          <p className="ds-error">{s.loadFailed}</p>
        </div>
      </>
    );
  }

  if (!quote) {
    return (
      <>
        <style>{WIDGET_STYLES}</style>
        <div className={`ds-card ds-${resolvedTheme} ds-skeleton`} style={inlineStyle}>
          <div className="ds-quote">{' '.repeat(25)}</div>
          <div className="ds-meta">
            <span className="ds-author">{' '}</span>
            <span className="ds-source">{' '}</span>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{WIDGET_STYLES}</style>
      <div className={`ds-card ds-${resolvedTheme}`} style={inlineStyle}>
        <p className="ds-quote">{quote.text}</p>
        <div className="ds-meta">
          <span className="ds-author">
            — {quote.author}
            {quote.attribution === 'popular-attribution' && (
              <span className="ds-flag">{s.attributedPopular}</span>
            )}
          </span>
          {quote.source && (
            <span className="ds-source">
              {s.source}：
              {quote.sourceUrl ? (
                <a href={quote.sourceUrl} target="_blank" rel="noopener noreferrer">
                  {quote.source}
                </a>
              ) : (
                quote.source
              )}
            </span>
          )}
        </div>
        <div className="ds-actions">
          <div className="ds-share">
            <button
              className={`ds-btn${copyToast ? ' ds-toast' : ''}`}
              data-action="copy"
              type="button"
              aria-label={s.copy}
              onClick={handleCopy}
            >
              <span aria-hidden="true">⧉</span>
              <span className="ds-share-label">{copyToast ? s.copied : s.copy}</span>
            </button>
            <a
              className="ds-btn"
              data-action="x"
              href={buildXShareUrl({ text: quote.text, author: quote.author })}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.shareX}
            >
              <span aria-hidden="true">𝕏</span>
              <span className="ds-share-label">X</span>
            </a>
            <a
              className="ds-btn"
              data-action="line"
              href={buildLineShareUrl({ text: quote.text, author: quote.author })}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.shareLine}
            >
              <span aria-hidden="true">L</span>
              <span className="ds-share-label">LINE</span>
            </a>
          </div>
          <span className="ds-powered">
            <a
              href="https://personal-site-mocha-chi.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
            >
              {s.poweredBy}
            </a>
          </span>
        </div>
      </div>
    </>
  );
}

function attachRoot(host: HTMLElement): ShadowRoot | HTMLElement {
  if (typeof host.attachShadow === 'function') {
    if (host.shadowRoot) return host.shadowRoot;
    return host.attachShadow({ mode: 'open' });
  }
  console.warn('[daily-soup] attachShadow unsupported, falling back to light DOM');
  return host;
}

export function mount(host: HTMLElement, options: MountOptions = {}): MountHandle {
  const lang: Lang = options.lang ?? 'zh';
  const themeConfig: ThemeConfig = options.theme ?? 'auto';
  const scheduleUrl =
    options.scheduleUrl === undefined ? DEFAULT_SCHEDULE_BASE : options.scheduleUrl;
  const maxWidth = options.maxWidth;

  const root = attachRoot(host);
  if (root === host) {
    host.textContent = '';
  } else {
    const shadow = root as ShadowRoot;
    while (shadow.firstChild) shadow.removeChild(shadow.firstChild);
  }

  const container = document.createElement('div');
  root.appendChild(container);
  const reactRoot: Root = createRoot(container);
  flushSync(() => {
    reactRoot.render(
      <DailySoupWidget
        lang={lang}
        themeConfig={themeConfig}
        scheduleUrl={scheduleUrl}
        maxWidth={maxWidth}
      />
    );
  });

  return {
    destroy() {
      reactRoot.unmount();
      if (root === host) {
        host.textContent = '';
      } else if (host.shadowRoot) {
        while (host.shadowRoot.firstChild) {
          host.shadowRoot.removeChild(host.shadowRoot.firstChild);
        }
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
    const theme = (node.dataset.theme as 'auto' | 'light' | 'dark' | undefined) ?? 'auto';
    const scheduleUrl = node.dataset.scheduleUrl;
    const maxWidth = node.dataset.maxWidth;
    handles.push(mount(node, { lang, theme, scheduleUrl, maxWidth }));
  });
  return handles;
}
