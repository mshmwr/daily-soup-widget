"use strict";var DailySoup=(()=>{var w=Object.defineProperty;var O=Object.getOwnPropertyDescriptor;var Q=Object.getOwnPropertyNames;var F=Object.prototype.hasOwnProperty;var u=(e,t)=>()=>(e&&(t=e(e=0)),t);var L=(e,t)=>{for(var r in t)w(e,r,{get:t[r],enumerable:!0})},V=(e,t,r,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of Q(t))!F.call(e,o)&&o!==r&&w(e,o,{get:()=>t[o],enumerable:!(n=O(t,o))||n.enumerable});return e};var G=e=>V(w({},"__esModule",{value:!0}),e);function v(e){return C[e]??C.zh}var C,E=u(()=>{"use strict";C={zh:{copy:"\u8907\u88FD",copied:"\u5DF2\u8907\u88FD",share:"\u5206\u4EAB",source:"\u51FA\u8655",poweredBy:"\u7531 mshmwr \u63D0\u4F9B",attributedPopular:"\u50B3\u7D71\u6B78\u5C6C",shareX:"\u5206\u4EAB\u5230 X",shareLine:"\u5206\u4EAB\u5230 LINE",loadFailed:"\u672C\u65E5\u5C0F\u8A9E\u8F09\u5165\u5931\u6557"}}});function $(e){return typeof e=="object"&&e!==null}function k(e){return $(e)?e.base??"light":e==="light"||e==="dark"?e:typeof window>"u"||!window.matchMedia?"light":window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}function M(e){return $(e)?e:null}function R(e){if(typeof window>"u"||!window.matchMedia)return()=>{};let t=window.matchMedia("(prefers-color-scheme: dark)"),r=n=>e(n.matches?"dark":"light");return t.addEventListener("change",r),()=>t.removeEventListener("change",r)}var U=u(()=>{"use strict"});async function H(e){let t=`${e.text} \u2014 ${e.author}`;if(typeof navigator<"u"&&navigator.clipboard)try{return await navigator.clipboard.writeText(t),!0}catch{return!1}return!1}function z(e){let t=encodeURIComponent(`${e.text} \u2014 ${e.author}`),r=encodeURIComponent(D);return`https://twitter.com/intent/tweet?text=${t}&url=${r}`}function q(e){return`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(`${D} \u2014 ${e.text}`)}`}var D,I=u(()=>{"use strict";D="https://daily-soup-widget.vercel.app"});var P,A=u(()=>{"use strict";P=`
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
`});function g(e=new Date){let t=new Date(e.getTime()+288e5),r=t.getUTCFullYear(),n=String(t.getUTCMonth()+1).padStart(2,"0"),o=String(t.getUTCDate()).padStart(2,"0");return`${r}-${n}-${o}`}var W=u(()=>{"use strict"});var j={};L(j,{mount:()=>b,mountAll:()=>p});function i(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function J(e){return typeof e.attachShadow=="function"?e.shadowRoot?e.shadowRoot:e.attachShadow({mode:"open"}):(console.warn("[daily-soup] attachShadow unsupported, falling back to light DOM"),e)}function K(e){let t=document.createElement("style");t.textContent=P,e.appendChild(t)}function Z(e){let t=document.createElement("div");return t.className=`ds-card ds-${e} ds-skeleton`,t.innerHTML=`
    <div class="ds-quote">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
    <div class="ds-meta"><span class="ds-author">&nbsp;</span><span class="ds-source">&nbsp;</span></div>
  `,t}function _(e,t,r,n){let o=v(r);e.className=`ds-card ds-${n}`;let c=t.sourceUrl?`<a href="${i(t.sourceUrl)}" target="_blank" rel="noopener noreferrer">${i(t.source)}</a>`:i(t.source),d=t.attribution==="popular-attribution"?`<span class="ds-flag">${i(o.attributedPopular)}</span>`:"";e.innerHTML=`
    <p class="ds-quote">${i(t.text)}</p>
    <div class="ds-meta">
      <span class="ds-author">\u2014 ${i(t.author)}${d}</span>
      ${t.source?`<span class="ds-source">${o.source}\uFF1A${c}</span>`:""}
    </div>
    <div class="ds-actions">
      <div class="ds-share">
        <button class="ds-btn" data-action="copy" type="button" aria-label="${i(o.copy)}">
          <span aria-hidden="true">\u29C9</span><span class="ds-share-label">${i(o.copy)}</span>
        </button>
        <a class="ds-btn" data-action="x" href="${i(z({text:t.text,author:t.author}))}" target="_blank" rel="noopener noreferrer" aria-label="${i(o.shareX)}">
          <span aria-hidden="true">\u{1D54F}</span><span class="ds-share-label">X</span>
        </a>
        <a class="ds-btn" data-action="line" href="${i(q({text:t.text,author:t.author}))}" target="_blank" rel="noopener noreferrer" aria-label="${i(o.shareLine)}">
          <span aria-hidden="true">L</span><span class="ds-share-label">LINE</span>
        </a>
      </div>
      <span class="ds-powered"><a href="https://personal-site-mocha-chi.vercel.app" target="_blank" rel="noopener noreferrer">${o.poweredBy}</a></span>
    </div>
  `;let a=e.querySelector('[data-action="copy"]');a&&a.addEventListener("click",async()=>{if(await H({text:t.text,author:t.author})){let s=a.querySelector(".ds-share-label"),f=s?.textContent??"";s&&(s.textContent=o.copied),a.classList.add("ds-toast"),setTimeout(()=>{s&&(s.textContent=f),a.classList.remove("ds-toast")},2e3)}})}function N(e,t,r){e.className=`ds-card ds-${r}`;let n=v(t);e.innerHTML=`<p class="ds-error">${i(n.loadFailed)}</p>`}async function ee(e,t){let r=e.replace(/\/$/,""),n=`${r}/schedule-${t}.json`;try{let c=await fetch(n,r===""?{credentials:"omit"}:{credentials:"omit",mode:"cors"});return c.ok?await c.json():null}catch{return null}}function X(e){let t=g(),r=e.entries[t];if(r&&e.quotes[r])return e.quotes[r];let n=Object.keys(e.quotes).sort()[0];return n&&e.quotes[n]?(console.warn("[daily-soup] today entry missing or stale, falling back to first quote"),e.quotes[n]):null}function te(e,t,r){let n=M(t);n&&(n.bg&&e.style.setProperty("--ds-bg",n.bg),n.ink&&e.style.setProperty("--ds-fg",n.ink),n.muted&&e.style.setProperty("--ds-muted",n.muted),n.border&&e.style.setProperty("--ds-border",n.border),n.accent&&e.style.setProperty("--ds-accent",n.accent)),r&&e.style.setProperty("--ds-max-width",r)}function b(e,t={}){let r=t.lang??"zh",n=t.theme??"auto",o=t.scheduleUrl===void 0?Y:t.scheduleUrl,c=t.maxWidth,d=k(n),a=J(e);if(a===e)e.textContent="";else for(;a.firstChild;)a.removeChild(a.firstChild);K(a);let h=Z(d);te(h,n,c),a.appendChild(h);let s={lang:r,themeConfig:n,scheduleUrl:o,host:e,root:a,cardEl:h,unwatchTheme:()=>{},unwatchVisibility:()=>{},schedule:null,displayedDate:""};n==="auto"&&(s.unwatchTheme=R(l=>{d=l,s.cardEl.classList.remove("ds-light","ds-dark"),s.cardEl.classList.add(`ds-${l}`)}));let f=!1,x=!1,T=async()=>{let l=await ee(o,r);if(f)return;if(!l){if(!x){x=!0,setTimeout(T,2e3);return}N(s.cardEl,r,d);return}s.schedule=l;let m=X(l);if(!m){N(s.cardEl,r,d);return}s.displayedDate=g(),_(s.cardEl,m,r,d)};if(T(),typeof document<"u"){let l=()=>{if(document.visibilityState!=="visible"||!s.schedule)return;let m=g();if(m===s.displayedDate)return;let S=X(s.schedule);S&&(s.displayedDate=m,_(s.cardEl,S,r,d))};document.addEventListener("visibilitychange",l),s.unwatchVisibility=()=>document.removeEventListener("visibilitychange",l)}return{destroy(){if(f=!0,s.unwatchTheme(),s.unwatchVisibility(),a===e)e.textContent="";else if(e.shadowRoot)for(;e.shadowRoot.firstChild;)e.shadowRoot.removeChild(e.shadowRoot.firstChild)}}}function p(e="[data-daily-soup], #daily-soup"){if(typeof document>"u")return[];let t=document.querySelectorAll(e),r=[];return t.forEach(n=>{let o=n.dataset.lang??"zh",c=n.dataset.theme??"auto",d=n.dataset.scheduleUrl,a=n.dataset.maxWidth;r.push(b(n,{lang:o,theme:c,scheduleUrl:d,maxWidth:a}))}),r}var Y,y=u(()=>{"use strict";E();U();I();A();W();Y="https://daily-soup-widget.vercel.app"});var ne={};L(ne,{mount:()=>b,mountAll:()=>p});y();y();function B(){let e=p();return typeof window<"u"&&(window.DailySoup=window.DailySoup??{},Promise.resolve().then(()=>(y(),j)).then(({mount:t})=>{window.DailySoup&&(window.DailySoup.mount=t,window.DailySoup.mountAll=p)})),e}typeof document<"u"&&(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",B,{once:!0}):B());return G(ne);})();
//# sourceMappingURL=embed.js.map
