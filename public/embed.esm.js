// src/i18n.ts
var STRINGS = {
  zh: {
    copy: "\u8907\u88FD",
    copied: "\u5DF2\u8907\u88FD",
    share: "\u5206\u4EAB",
    source: "\u51FA\u8655",
    poweredBy: "\u7531 mshmwr \u63D0\u4F9B",
    attributedPopular: "\u50B3\u7D71\u6B78\u5C6C",
    shareX: "\u5206\u4EAB\u5230 X",
    shareLine: "\u5206\u4EAB\u5230 LINE",
    loadFailed: "\u672C\u65E5\u5C0F\u8A9E\u8F09\u5165\u5931\u6557"
  },
  en: {
    copy: "Copy",
    copied: "Copied!",
    share: "Share",
    source: "Source",
    poweredBy: "powered by mshmwr",
    attributedPopular: "popularly attributed",
    shareX: "Share on X",
    shareLine: "Share on LINE",
    loadFailed: "Failed to load daily quote"
  }
};
function t(lang) {
  return STRINGS[lang] ?? STRINGS.zh;
}

// src/theme.ts
function isThemeColors(config) {
  return typeof config === "object" && config !== null;
}
function resolveTheme(config) {
  if (isThemeColors(config)) return config.base ?? "light";
  if (config === "light" || config === "dark") return config;
  if (typeof window === "undefined" || !window.matchMedia) return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function getThemeColors(config) {
  return isThemeColors(config) ? config : null;
}
function watchSystemTheme(cb) {
  if (typeof window === "undefined" || !window.matchMedia) return () => {
  };
  const mql = window.matchMedia("(prefers-color-scheme: dark)");
  const handler = (e) => cb(e.matches ? "dark" : "light");
  mql.addEventListener("change", handler);
  return () => mql.removeEventListener("change", handler);
}

// src/share.ts
var SHARE_URL = "https://daily-soup-widget.vercel.app";
async function copyToClipboard(content) {
  const payload = `${content.text} \u2014 ${content.author}`;
  if (typeof navigator !== "undefined" && navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(payload);
      return true;
    } catch {
      return false;
    }
  }
  return false;
}
function buildXShareUrl(content) {
  const text = encodeURIComponent(`${content.text} \u2014 ${content.author}`);
  const url = encodeURIComponent(SHARE_URL);
  return `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
}
function buildLineShareUrl(content) {
  const url = encodeURIComponent(`${SHARE_URL} \u2014 ${content.text}`);
  return `https://social-plugins.line.me/lineit/share?url=${url}`;
}

// src/styles.ts
var WIDGET_STYLES = `
  :host { all: initial; display: block; font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Noto Sans TC", sans-serif; }
  * { box-sizing: border-box; }
  .ds-card {
    container-type: inline-size;
    width: 100%;
    max-width: var(--ds-max-width, 32rem);
    margin: 0 auto;
    padding: 1.25rem 1.5rem;
    border-radius: 0.75rem;
    border: 1px solid var(--ds-border);
    background: var(--ds-bg);
    color: var(--ds-fg);
    font-size: clamp(0.875rem, 2.5cqi, 1.25rem);
    line-height: 1.7;
    transition: background 0.2s ease, color 0.2s ease;
  }
  .ds-card.ds-light {
    --ds-bg: #fdfcf7;
    --ds-fg: #1f2933;
    --ds-accent: #5b6b9e;
    --ds-muted: #6b7280;
    --ds-border: #e5e7eb;
  }
  .ds-card.ds-dark {
    --ds-bg: #1a1d24;
    --ds-fg: #e5e7eb;
    --ds-accent: #9aa9d4;
    --ds-muted: #9ca3af;
    --ds-border: #2d323d;
  }
  .ds-quote {
    margin: 0 0 0.875rem;
    font-size: 1.1em;
    font-weight: 500;
    letter-spacing: 0.01em;
    white-space: pre-wrap;
  }
  .ds-quote::before { content: '\\201C'; margin-right: 0.15em; color: var(--ds-accent); }
  .ds-quote::after  { content: '\\201D'; margin-left: 0.15em; color: var(--ds-accent); }
  .ds-meta { display: flex; flex-direction: column; gap: 0.15rem; margin-bottom: 0.875rem; font-size: 0.875em; color: var(--ds-muted); }
  .ds-author { font-weight: 500; color: var(--ds-fg); }
  .ds-source { font-size: 0.95em; }
  .ds-source a { color: var(--ds-accent); text-decoration: none; }
  .ds-source a:hover { text-decoration: underline; }
  .ds-flag { display: inline-block; margin-left: 0.25rem; padding: 0 0.4rem; font-size: 0.75em; border: 1px solid var(--ds-border); border-radius: 9999px; color: var(--ds-muted); }
  .ds-actions { display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; margin-top: 0.875rem; padding-top: 0.875rem; border-top: 1px solid var(--ds-border); }
  .ds-share { display: flex; gap: 0.35rem; }
  .ds-btn {
    appearance: none;
    background: transparent;
    color: var(--ds-fg);
    border: 1px solid var(--ds-border);
    border-radius: 0.5rem;
    padding: 0.3rem 0.7rem;
    font-size: 0.85em;
    font-family: inherit;
    cursor: pointer;
    transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
  }
  .ds-btn:hover { background: var(--ds-accent); color: var(--ds-bg); border-color: var(--ds-accent); }
  .ds-btn:focus-visible { outline: 2px solid var(--ds-accent); outline-offset: 2px; }
  .ds-btn.ds-toast { background: var(--ds-accent); color: var(--ds-bg); border-color: var(--ds-accent); }
  .ds-powered { font-size: 0.75em; color: var(--ds-muted); }
  .ds-powered a { color: var(--ds-muted); text-decoration: none; }
  .ds-powered a:hover { text-decoration: underline; }
  .ds-skeleton .ds-quote { background: var(--ds-border); border-radius: 0.25rem; color: transparent; }
  .ds-skeleton .ds-quote::before, .ds-skeleton .ds-quote::after { content: ''; }
  .ds-error { color: var(--ds-muted); font-size: 0.875em; }

  @container (max-width: 320px) {
    .ds-card { padding: 1rem 1.1rem; }
    .ds-share-label { display: none; }
    .ds-actions { flex-wrap: wrap; }
  }
  @container (min-width: 500px) {
    .ds-quote { font-size: 1.25em; }
  }
  @container (min-width: 700px) {
    .ds-card { padding: 1.75rem 2rem; }
    .ds-quote { font-size: 1.35em; margin-bottom: 1.125rem; }
    .ds-meta { gap: 0.25rem; margin-bottom: 1.125rem; }
    .ds-actions { margin-top: 1.125rem; padding-top: 1.125rem; }
  }
  @media (prefers-reduced-motion: reduce) {
    .ds-card, .ds-btn { transition: none; }
  }
`;

// src/date.ts
function todayUtc8(now = /* @__PURE__ */ new Date()) {
  const utc8 = new Date(now.getTime() + 8 * 60 * 60 * 1e3);
  const yy = utc8.getUTCFullYear();
  const mm = String(utc8.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(utc8.getUTCDate()).padStart(2, "0");
  return `${yy}-${mm}-${dd}`;
}

// src/widget.ts
var DEFAULT_SCHEDULE_BASE = "https://daily-soup-widget.vercel.app";
function escape(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function attachRoot(host) {
  if (typeof host.attachShadow === "function") {
    if (host.shadowRoot) return host.shadowRoot;
    return host.attachShadow({ mode: "open" });
  }
  console.warn("[daily-soup] attachShadow unsupported, falling back to light DOM");
  return host;
}
function injectStyles(root) {
  const style = document.createElement("style");
  style.textContent = WIDGET_STYLES;
  root.appendChild(style);
}
function buildSkeleton(theme) {
  const card = document.createElement("div");
  card.className = `ds-card ds-${theme} ds-skeleton`;
  card.innerHTML = `
    <div class="ds-quote">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
    <div class="ds-meta"><span class="ds-author">&nbsp;</span><span class="ds-source">&nbsp;</span></div>
  `;
  return card;
}
function renderQuote(card, quote, lang, theme) {
  const s = t(lang);
  card.className = `ds-card ds-${theme}`;
  const sourceLabel = quote.sourceUrl ? `<a href="${escape(quote.sourceUrl)}" target="_blank" rel="noopener noreferrer">${escape(quote.source)}</a>` : escape(quote.source);
  const flag = quote.attribution === "popular-attribution" ? `<span class="ds-flag">${escape(s.attributedPopular)}</span>` : "";
  card.innerHTML = `
    <p class="ds-quote">${escape(quote.text)}</p>
    <div class="ds-meta">
      <span class="ds-author">\u2014 ${escape(quote.author)}${flag}</span>
      ${quote.source ? `<span class="ds-source">${s.source}\uFF1A${sourceLabel}</span>` : ""}
    </div>
    <div class="ds-actions">
      <div class="ds-share">
        <button class="ds-btn" data-action="copy" type="button" aria-label="${escape(s.copy)}">
          <span aria-hidden="true">\u29C9</span><span class="ds-share-label">${escape(s.copy)}</span>
        </button>
        <a class="ds-btn" data-action="x" href="${escape(buildXShareUrl({ text: quote.text, author: quote.author }))}" target="_blank" rel="noopener noreferrer" aria-label="${escape(s.shareX)}">
          <span aria-hidden="true">\u{1D54F}</span><span class="ds-share-label">X</span>
        </a>
        <a class="ds-btn" data-action="line" href="${escape(buildLineShareUrl({ text: quote.text, author: quote.author }))}" target="_blank" rel="noopener noreferrer" aria-label="${escape(s.shareLine)}">
          <span aria-hidden="true">L</span><span class="ds-share-label">LINE</span>
        </a>
      </div>
      <span class="ds-powered"><a href="https://personal-site-mocha-chi.vercel.app" target="_blank" rel="noopener noreferrer">${s.poweredBy}</a></span>
    </div>
  `;
  const copyBtn = card.querySelector('[data-action="copy"]');
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      const ok = await copyToClipboard({ text: quote.text, author: quote.author });
      if (ok) {
        const label = copyBtn.querySelector(".ds-share-label");
        const originalLabel = label?.textContent ?? "";
        if (label) label.textContent = s.copied;
        copyBtn.classList.add("ds-toast");
        setTimeout(() => {
          if (label) label.textContent = originalLabel;
          copyBtn.classList.remove("ds-toast");
        }, 2e3);
      }
    });
  }
}
function renderError(card, lang, theme) {
  card.className = `ds-card ds-${theme}`;
  const s = t(lang);
  card.innerHTML = `<p class="ds-error">${escape(s.loadFailed)}</p>`;
}
async function fetchSchedule(scheduleUrl, lang) {
  const base = scheduleUrl.replace(/\/$/, "");
  const url = `${base}/schedule-${lang}.json`;
  try {
    const init = base === "" ? { credentials: "omit" } : { credentials: "omit", mode: "cors" };
    const res = await fetch(url, init);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}
function pickQuote(schedule) {
  const today = todayUtc8();
  const id = schedule.entries[today];
  if (id && schedule.quotes[id]) return schedule.quotes[id];
  const fallbackId = Object.keys(schedule.quotes).sort()[0];
  if (fallbackId && schedule.quotes[fallbackId]) {
    console.warn("[daily-soup] today entry missing or stale, falling back to first quote");
    return schedule.quotes[fallbackId];
  }
  return null;
}
function applyThemeOverrides(card, config, maxWidth) {
  const colors = getThemeColors(config);
  if (colors) {
    if (colors.bg) card.style.setProperty("--ds-bg", colors.bg);
    if (colors.ink) card.style.setProperty("--ds-fg", colors.ink);
    if (colors.muted) card.style.setProperty("--ds-muted", colors.muted);
    if (colors.border) card.style.setProperty("--ds-border", colors.border);
    if (colors.accent) card.style.setProperty("--ds-accent", colors.accent);
  }
  if (maxWidth) card.style.setProperty("--ds-max-width", maxWidth);
}
function mount(host, options = {}) {
  const lang = options.lang ?? "zh";
  const themeConfig = options.theme ?? "auto";
  const scheduleUrl = options.scheduleUrl === void 0 ? DEFAULT_SCHEDULE_BASE : options.scheduleUrl;
  const maxWidth = options.maxWidth;
  let resolvedTheme = resolveTheme(themeConfig);
  const root = attachRoot(host);
  if (root === host) {
    host.textContent = "";
  } else {
    while (root.firstChild) root.removeChild(root.firstChild);
  }
  injectStyles(root);
  const card = buildSkeleton(resolvedTheme);
  applyThemeOverrides(card, themeConfig, maxWidth);
  root.appendChild(card);
  const state = {
    lang,
    themeConfig,
    scheduleUrl,
    host,
    root,
    cardEl: card,
    unwatchTheme: () => {
    }
  };
  if (themeConfig === "auto") {
    state.unwatchTheme = watchSystemTheme((t2) => {
      resolvedTheme = t2;
      state.cardEl.classList.remove("ds-light", "ds-dark");
      state.cardEl.classList.add(`ds-${t2}`);
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
        setTimeout(load, 2e3);
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
        host.textContent = "";
      } else if (host.shadowRoot) {
        while (host.shadowRoot.firstChild) host.shadowRoot.removeChild(host.shadowRoot.firstChild);
      }
    }
  };
}
function mountAll(selector = "[data-daily-soup], #daily-soup") {
  if (typeof document === "undefined") return [];
  const nodes = document.querySelectorAll(selector);
  const handles = [];
  nodes.forEach((node) => {
    const lang = node.dataset.lang ?? "zh";
    const theme = node.dataset.theme ?? "auto";
    const scheduleUrl = node.dataset.scheduleUrl;
    const maxWidth = node.dataset.maxWidth;
    handles.push(mount(node, { lang, theme, scheduleUrl, maxWidth }));
  });
  return handles;
}

// src/component.tsx
import { useEffect, useRef } from "react";
import { jsx } from "react/jsx-runtime";
function DailySoup({ lang = "zh", theme = "auto", scheduleUrl, className, maxWidth }) {
  const hostRef = useRef(null);
  const themeKey = typeof theme === "string" ? theme : JSON.stringify(theme);
  useEffect(() => {
    if (!hostRef.current) return;
    const handle = mount(hostRef.current, { lang, theme, scheduleUrl, maxWidth });
    return () => handle.destroy();
  }, [lang, themeKey, scheduleUrl, maxWidth]);
  return /* @__PURE__ */ jsx("div", { ref: hostRef, className, "data-daily-soup-host": "" });
}
export {
  DailySoup,
  mount,
  mountAll
};
//# sourceMappingURL=embed.esm.js.map
