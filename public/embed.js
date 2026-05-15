"use strict";var DailySoup=(()=>{var b=Object.defineProperty;var _=Object.getOwnPropertyDescriptor;var N=Object.getOwnPropertyNames;var B=Object.prototype.hasOwnProperty;var u=(e,t)=>()=>(e&&(t=e(e=0)),t);var S=(e,t)=>{for(var n in t)b(e,n,{get:t[n],enumerable:!0})},F=(e,t,n,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of N(t))!B.call(e,r)&&r!==n&&b(e,r,{get:()=>t[r],enumerable:!(o=_(t,r))||o.enumerable});return e};var P=e=>F(b({},"__esModule",{value:!0}),e);function y(e){return x[e]??x.zh}var x,T=u(()=>{"use strict";x={zh:{copy:"\u8907\u88FD",copied:"\u5DF2\u8907\u88FD",share:"\u5206\u4EAB",source:"\u51FA\u8655",poweredBy:"\u7531 coco-c.dev \u63D0\u4F9B",attributedPopular:"\u50B3\u7D71\u6B78\u5C6C",shareX:"\u5206\u4EAB\u5230 X",shareLine:"\u5206\u4EAB\u5230 LINE",loadFailed:"\u672C\u65E5\u5C0F\u8A9E\u8F09\u5165\u5931\u6557"},en:{copy:"Copy",copied:"Copied!",share:"Share",source:"Source",poweredBy:"powered by coco-c.dev",attributedPopular:"popularly attributed",shareX:"Share on X",shareLine:"Share on LINE",loadFailed:"Failed to load daily quote"}}});function L(e){return e==="light"||e==="dark"?e:typeof window>"u"||!window.matchMedia?"light":window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}function C(e){if(typeof window>"u"||!window.matchMedia)return()=>{};let t=window.matchMedia("(prefers-color-scheme: dark)"),n=o=>e(o.matches?"dark":"light");return t.addEventListener("change",n),()=>t.removeEventListener("change",n)}var E=u(()=>{"use strict"});async function k(e){let t=`${e.text} \u2014 ${e.author}`;if(typeof navigator<"u"&&navigator.clipboard)try{return await navigator.clipboard.writeText(t),!0}catch{return!1}return!1}function M(e){let t=encodeURIComponent(`${e.text} \u2014 ${e.author}`),n=encodeURIComponent($);return`https://twitter.com/intent/tweet?text=${t}&url=${n}`}function R(e){return`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(`${$} \u2014 ${e.text}`)}`}var $,U=u(()=>{"use strict";$="https://daily-soup.vercel.app"});var H,D=u(()=>{"use strict";H=`
  :host { all: initial; display: block; font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Noto Sans TC", sans-serif; }
  * { box-sizing: border-box; }
  .ds-card {
    container-type: inline-size;
    width: 100%;
    max-width: 32rem;
    margin: 0 auto;
    padding: 1.25rem 1.5rem;
    border-radius: 0.75rem;
    border: 1px solid var(--ds-border);
    background: var(--ds-bg);
    color: var(--ds-fg);
    font-size: clamp(0.875rem, 2.5cqi, 1.125rem);
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
  @media (prefers-reduced-motion: reduce) {
    .ds-card, .ds-btn { transition: none; }
  }
`});function z(e=new Date){let t=new Date(e.getTime()+288e5),n=t.getUTCFullYear(),o=String(t.getUTCMonth()+1).padStart(2,"0"),r=String(t.getUTCDate()).padStart(2,"0");return`${n}-${o}-${r}`}var I=u(()=>{"use strict"});var A={};S(A,{mount:()=>f,mountAll:()=>p});function a(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function W(e){return typeof e.attachShadow=="function"?e.shadowRoot?e.shadowRoot:e.attachShadow({mode:"open"}):(console.warn("[daily-soup] attachShadow unsupported, falling back to light DOM"),e)}function j(e){let t=document.createElement("style");t.textContent=H,e.appendChild(t)}function O(e){let t=document.createElement("div");return t.className=`ds-card ds-${e} ds-skeleton`,t.innerHTML=`
    <div class="ds-quote">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
    <div class="ds-meta"><span class="ds-author">&nbsp;</span><span class="ds-source">&nbsp;</span></div>
  `,t}function G(e,t,n,o){let r=y(n);e.className=`ds-card ds-${o}`;let s=t.sourceUrl?`<a href="${a(t.sourceUrl)}" target="_blank" rel="noopener noreferrer">${a(t.source)}</a>`:a(t.source),d=t.attribution==="popular-attribution"?`<span class="ds-flag">${a(r.attributedPopular)}</span>`:"";e.innerHTML=`
    <p class="ds-quote">${a(t.text)}</p>
    <div class="ds-meta">
      <span class="ds-author">\u2014 ${a(t.author)}${d}</span>
      ${t.source?`<span class="ds-source">${r.source}\uFF1A${s}</span>`:""}
    </div>
    <div class="ds-actions">
      <div class="ds-share">
        <button class="ds-btn" data-action="copy" type="button" aria-label="${a(r.copy)}">
          <span aria-hidden="true">\u29C9</span><span class="ds-share-label">${a(r.copy)}</span>
        </button>
        <a class="ds-btn" data-action="x" href="${a(M({text:t.text,author:t.author}))}" target="_blank" rel="noopener noreferrer" aria-label="${a(r.shareX)}">
          <span aria-hidden="true">\u{1D54F}</span><span class="ds-share-label">X</span>
        </a>
        <a class="ds-btn" data-action="line" href="${a(R({text:t.text,author:t.author}))}" target="_blank" rel="noopener noreferrer" aria-label="${a(r.shareLine)}">
          <span aria-hidden="true">L</span><span class="ds-share-label">LINE</span>
        </a>
      </div>
      <span class="ds-powered"><a href="https://coco-c.dev" target="_blank" rel="noopener noreferrer">${r.poweredBy}</a></span>
    </div>
  `;let i=e.querySelector('[data-action="copy"]');i&&i.addEventListener("click",async()=>{if(await k({text:t.text,author:t.author})){let c=i.querySelector(".ds-share-label"),h=c?.textContent??"";c&&(c.textContent=r.copied),i.classList.add("ds-toast"),setTimeout(()=>{c&&(c.textContent=h),i.classList.remove("ds-toast")},2e3)}})}function q(e,t,n){e.className=`ds-card ds-${n}`;let o=y(t);e.innerHTML=`<p class="ds-error">${a(o.loadFailed)}</p>`}async function Y(e,t){let n=e.replace(/\/$/,""),o=`${n}/schedule-${t}.json`;try{let s=await fetch(o,n===""?{credentials:"omit"}:{credentials:"omit",mode:"cors"});return s.ok?await s.json():null}catch{return null}}function J(e){let t=z(),n=e.entries[t];if(n&&e.quotes[n])return e.quotes[n];let o=Object.keys(e.quotes).sort()[0];return o&&e.quotes[o]?(console.warn("[daily-soup] today entry missing or stale, falling back to first quote"),e.quotes[o]):null}function f(e,t={}){let n=t.lang??"zh",o=t.theme??"auto",r=t.scheduleUrl===void 0?Q:t.scheduleUrl,s=L(o),d=W(e);if(d===e)e.textContent="";else for(;d.firstChild;)d.removeChild(d.firstChild);j(d);let i=O(s);d.appendChild(i);let l={lang:n,themeConfig:o,scheduleUrl:r,host:e,root:d,cardEl:i,unwatchTheme:()=>{}};o==="auto"&&(l.unwatchTheme=C(m=>{s=m,l.cardEl.classList.remove("ds-light","ds-dark"),l.cardEl.classList.add(`ds-${m}`)}));let c=!1,h=!1,w=async()=>{let m=await Y(r,n);if(c)return;if(!m){if(!h){h=!0,setTimeout(w,2e3);return}q(l.cardEl,n,s);return}let v=J(m);if(!v){q(l.cardEl,n,s);return}G(l.cardEl,v,n,s)};return w(),{destroy(){if(c=!0,l.unwatchTheme(),d===e)e.textContent="";else if(e.shadowRoot)for(;e.shadowRoot.firstChild;)e.shadowRoot.removeChild(e.shadowRoot.firstChild)}}}function p(e="[data-daily-soup], #daily-soup"){if(typeof document>"u")return[];let t=document.querySelectorAll(e),n=[];return t.forEach(o=>{let r=o.dataset.lang??"zh",s=o.dataset.theme??"auto",d=o.dataset.scheduleUrl;n.push(f(o,{lang:r,theme:s,scheduleUrl:d}))}),n}var Q,g=u(()=>{"use strict";T();E();U();D();I();Q="https://daily-soup.vercel.app"});var K={};S(K,{mount:()=>f,mountAll:()=>p});g();g();function X(){let e=p();return typeof window<"u"&&(window.DailySoup=window.DailySoup??{},Promise.resolve().then(()=>(g(),A)).then(({mount:t})=>{window.DailySoup&&(window.DailySoup.mount=t,window.DailySoup.mountAll=p)})),e}typeof document<"u"&&(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",X,{once:!0}):X());return P(K);})();
//# sourceMappingURL=embed.js.map
