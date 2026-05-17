// src/widget.tsx
import { useCallback, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { flushSync } from "react-dom";

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
  .ds-btn:hover { color: var(--ds-accent); border-color: var(--ds-accent); }
  .ds-btn:focus-visible { outline: 2px solid var(--ds-accent); outline-offset: 2px; }
  .ds-btn.ds-toast { color: var(--ds-accent); border-color: var(--ds-accent); }
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
    .ds-meta { flex-direction: row; flex-wrap: wrap; align-items: baseline; gap: 0.25rem 0.75rem; }
  }
  @container (min-width: 700px) {
    .ds-card { padding: 1.75rem 2rem; }
    .ds-quote { font-size: 1.35em; margin-bottom: 1.125rem; }
    .ds-meta { gap: 0.25rem 1rem; margin-bottom: 1.125rem; }
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

// src/widget.tsx
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var DEFAULT_SCHEDULE_BASE = "https://daily-soup-widget.vercel.app";
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
function pickQuote(schedule, today) {
  const id = schedule.entries[today];
  if (id && schedule.quotes[id]) return schedule.quotes[id];
  const fallbackId = Object.keys(schedule.quotes).sort()[0];
  if (fallbackId && schedule.quotes[fallbackId]) {
    console.warn("[daily-soup] today entry missing or stale, falling back to first quote");
    return schedule.quotes[fallbackId];
  }
  return null;
}
function buildInlineStyle(themeConfig, maxWidth) {
  const style = {};
  const colors = getThemeColors(themeConfig);
  if (colors) {
    if (colors.bg) style["--ds-bg"] = colors.bg;
    if (colors.ink) style["--ds-fg"] = colors.ink;
    if (colors.muted) style["--ds-muted"] = colors.muted;
    if (colors.border) style["--ds-border"] = colors.border;
    if (colors.accent) style["--ds-accent"] = colors.accent;
  }
  if (maxWidth) style["--ds-max-width"] = maxWidth;
  return style;
}
function DailySoupWidget({ lang, themeConfig, scheduleUrl, maxWidth }) {
  const [resolvedTheme, setResolvedTheme] = useState(() => resolveTheme(themeConfig));
  const [schedule, setSchedule] = useState(null);
  const [displayedDate, setDisplayedDate] = useState("");
  const [quote, setQuote] = useState(null);
  const [loadFailed, setLoadFailed] = useState(false);
  const [copyToast, setCopyToast] = useState(false);
  useEffect(() => {
    if (themeConfig !== "auto") {
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
          setTimeout(load, 2e3);
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
    if (!schedule || typeof document === "undefined") return;
    const onVisibility = () => {
      if (document.visibilityState !== "visible") return;
      const today = todayUtc8();
      if (today === displayedDate) return;
      const q = pickQuote(schedule, today);
      if (!q) return;
      flushSync(() => {
        setDisplayedDate(today);
        setQuote(q);
      });
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [schedule, displayedDate]);
  const inlineStyle = buildInlineStyle(themeConfig, maxWidth);
  const s = t(lang);
  const handleCopy = useCallback(async () => {
    if (!quote) return;
    const ok = await copyToClipboard({ text: quote.text, author: quote.author });
    if (ok) {
      setCopyToast(true);
      setTimeout(() => setCopyToast(false), 2e3);
    }
  }, [quote]);
  if (loadFailed) {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("style", { children: WIDGET_STYLES }),
      /* @__PURE__ */ jsx("div", { className: `ds-card ds-${resolvedTheme}`, style: inlineStyle, children: /* @__PURE__ */ jsx("p", { className: "ds-error", children: s.loadFailed }) })
    ] });
  }
  if (!quote) {
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("style", { children: WIDGET_STYLES }),
      /* @__PURE__ */ jsxs("div", { className: `ds-card ds-${resolvedTheme} ds-skeleton`, style: inlineStyle, children: [
        /* @__PURE__ */ jsx("div", { className: "ds-quote", children: "\xA0".repeat(25) }),
        /* @__PURE__ */ jsxs("div", { className: "ds-meta", children: [
          /* @__PURE__ */ jsx("span", { className: "ds-author", children: "\xA0" }),
          /* @__PURE__ */ jsx("span", { className: "ds-source", children: "\xA0" })
        ] })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("style", { children: WIDGET_STYLES }),
    /* @__PURE__ */ jsxs("div", { className: `ds-card ds-${resolvedTheme}`, style: inlineStyle, children: [
      /* @__PURE__ */ jsx("p", { className: "ds-quote", children: quote.text }),
      /* @__PURE__ */ jsxs("div", { className: "ds-meta", children: [
        /* @__PURE__ */ jsxs("span", { className: "ds-author", children: [
          "\u2014 ",
          quote.author,
          quote.attribution === "popular-attribution" && /* @__PURE__ */ jsx("span", { className: "ds-flag", children: s.attributedPopular })
        ] }),
        quote.source && /* @__PURE__ */ jsxs("span", { className: "ds-source", children: [
          s.source,
          "\uFF1A",
          quote.sourceUrl ? /* @__PURE__ */ jsx("a", { href: quote.sourceUrl, target: "_blank", rel: "noopener noreferrer", children: quote.source }) : quote.source
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "ds-actions", children: [
        /* @__PURE__ */ jsxs("div", { className: "ds-share", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              className: `ds-btn${copyToast ? " ds-toast" : ""}`,
              "data-action": "copy",
              type: "button",
              "aria-label": s.copy,
              onClick: handleCopy,
              children: [
                /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "\u29C9" }),
                /* @__PURE__ */ jsx("span", { className: "ds-share-label", children: copyToast ? s.copied : s.copy })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "a",
            {
              className: "ds-btn",
              "data-action": "x",
              href: buildXShareUrl({ text: quote.text, author: quote.author }),
              target: "_blank",
              rel: "noopener noreferrer",
              "aria-label": s.shareX,
              children: [
                /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "\u{1D54F}" }),
                /* @__PURE__ */ jsx("span", { className: "ds-share-label", children: "X" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "a",
            {
              className: "ds-btn",
              "data-action": "line",
              href: buildLineShareUrl({ text: quote.text, author: quote.author }),
              target: "_blank",
              rel: "noopener noreferrer",
              "aria-label": s.shareLine,
              children: [
                /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "L" }),
                /* @__PURE__ */ jsx("span", { className: "ds-share-label", children: "LINE" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("span", { className: "ds-powered", children: /* @__PURE__ */ jsx(
          "a",
          {
            href: "https://personal-site-mocha-chi.vercel.app",
            target: "_blank",
            rel: "noopener noreferrer",
            children: s.poweredBy
          }
        ) })
      ] })
    ] })
  ] });
}
function attachRoot(host) {
  if (typeof host.attachShadow === "function") {
    if (host.shadowRoot) return host.shadowRoot;
    return host.attachShadow({ mode: "open" });
  }
  console.warn("[daily-soup] attachShadow unsupported, falling back to light DOM");
  return host;
}
function mount(host, options = {}) {
  const lang = options.lang ?? "zh";
  const themeConfig = options.theme ?? "auto";
  const scheduleUrl = options.scheduleUrl === void 0 ? DEFAULT_SCHEDULE_BASE : options.scheduleUrl;
  const maxWidth = options.maxWidth;
  const root = attachRoot(host);
  if (root === host) {
    host.textContent = "";
  } else {
    const shadow = root;
    while (shadow.firstChild) shadow.removeChild(shadow.firstChild);
  }
  const container = document.createElement("div");
  root.appendChild(container);
  const reactRoot = createRoot(container);
  flushSync(() => {
    reactRoot.render(
      /* @__PURE__ */ jsx(
        DailySoupWidget,
        {
          lang,
          themeConfig,
          scheduleUrl,
          maxWidth
        }
      )
    );
  });
  return {
    destroy() {
      reactRoot.unmount();
      if (root === host) {
        host.textContent = "";
      } else if (host.shadowRoot) {
        while (host.shadowRoot.firstChild) {
          host.shadowRoot.removeChild(host.shadowRoot.firstChild);
        }
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
import { useEffect as useEffect2, useRef } from "react";
import { jsx as jsx2 } from "react/jsx-runtime";
function DailySoup({ lang = "zh", theme = "auto", scheduleUrl, className, maxWidth }) {
  const hostRef = useRef(null);
  const themeKey = typeof theme === "string" ? theme : JSON.stringify(theme);
  useEffect2(() => {
    if (!hostRef.current) return;
    const handle = mount(hostRef.current, { lang, theme, scheduleUrl, maxWidth });
    return () => handle.destroy();
  }, [lang, themeKey, scheduleUrl, maxWidth]);
  return /* @__PURE__ */ jsx2("div", { ref: hostRef, className, "data-daily-soup-host": "" });
}
export {
  DailySoup,
  mount,
  mountAll
};
//# sourceMappingURL=embed.esm.js.map
