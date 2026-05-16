"use strict";var DailySoup=(()=>{var b=Object.defineProperty;var X=Object.getOwnPropertyDescriptor;var j=Object.getOwnPropertyNames;var B=Object.prototype.hasOwnProperty;var c=(e,t)=>()=>(e&&(t=e(e=0)),t);var T=(e,t)=>{for(var n in t)b(e,n,{get:t[n],enumerable:!0})},O=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of j(t))!B.call(e,o)&&o!==n&&b(e,o,{get:()=>t[o],enumerable:!(r=X(t,o))||r.enumerable});return e};var Q=e=>O(b({},"__esModule",{value:!0}),e);function y(e){return S[e]??S.zh}var S,L=c(()=>{"use strict";S={zh:{copy:"\u8907\u88FD",copied:"\u5DF2\u8907\u88FD",share:"\u5206\u4EAB",source:"\u51FA\u8655",poweredBy:"\u7531 mshmwr \u63D0\u4F9B",attributedPopular:"\u50B3\u7D71\u6B78\u5C6C",shareX:"\u5206\u4EAB\u5230 X",shareLine:"\u5206\u4EAB\u5230 LINE",loadFailed:"\u672C\u65E5\u5C0F\u8A9E\u8F09\u5165\u5931\u6557"}}});function C(e){return typeof e=="object"&&e!==null}function E(e){return C(e)?e.base??"light":e==="light"||e==="dark"?e:typeof window>"u"||!window.matchMedia?"light":window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}function k(e){return C(e)?e:null}function $(e){if(typeof window>"u"||!window.matchMedia)return()=>{};let t=window.matchMedia("(prefers-color-scheme: dark)"),n=r=>e(r.matches?"dark":"light");return t.addEventListener("change",n),()=>t.removeEventListener("change",n)}var M=c(()=>{"use strict"});async function U(e){let t=`${e.text} \u2014 ${e.author}`;if(typeof navigator<"u"&&navigator.clipboard)try{return await navigator.clipboard.writeText(t),!0}catch{return!1}return!1}function H(e){let t=encodeURIComponent(`${e.text} \u2014 ${e.author}`),n=encodeURIComponent(R);return`https://twitter.com/intent/tweet?text=${t}&url=${n}`}function D(e){return`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(`${R} \u2014 ${e.text}`)}`}var R,z=c(()=>{"use strict";R="https://daily-soup-widget.vercel.app"});var q,I=c(()=>{"use strict";q=`
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
`});function P(e=new Date){let t=new Date(e.getTime()+288e5),n=t.getUTCFullYear(),r=String(t.getUTCMonth()+1).padStart(2,"0"),o=String(t.getUTCDate()).padStart(2,"0");return`${n}-${r}-${o}`}var A=c(()=>{"use strict"});var _={};T(_,{mount:()=>f,mountAll:()=>p});function d(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function G(e){return typeof e.attachShadow=="function"?e.shadowRoot?e.shadowRoot:e.attachShadow({mode:"open"}):(console.warn("[daily-soup] attachShadow unsupported, falling back to light DOM"),e)}function Y(e){let t=document.createElement("style");t.textContent=q,e.appendChild(t)}function J(e){let t=document.createElement("div");return t.className=`ds-card ds-${e} ds-skeleton`,t.innerHTML=`
    <div class="ds-quote">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
    <div class="ds-meta"><span class="ds-author">&nbsp;</span><span class="ds-source">&nbsp;</span></div>
  `,t}function K(e,t,n,r){let o=y(n);e.className=`ds-card ds-${r}`;let l=t.sourceUrl?`<a href="${d(t.sourceUrl)}" target="_blank" rel="noopener noreferrer">${d(t.source)}</a>`:d(t.source),i=t.attribution==="popular-attribution"?`<span class="ds-flag">${d(o.attributedPopular)}</span>`:"";e.innerHTML=`
    <p class="ds-quote">${d(t.text)}</p>
    <div class="ds-meta">
      <span class="ds-author">\u2014 ${d(t.author)}${i}</span>
      ${t.source?`<span class="ds-source">${o.source}\uFF1A${l}</span>`:""}
    </div>
    <div class="ds-actions">
      <div class="ds-share">
        <button class="ds-btn" data-action="copy" type="button" aria-label="${d(o.copy)}">
          <span aria-hidden="true">\u29C9</span><span class="ds-share-label">${d(o.copy)}</span>
        </button>
        <a class="ds-btn" data-action="x" href="${d(H({text:t.text,author:t.author}))}" target="_blank" rel="noopener noreferrer" aria-label="${d(o.shareX)}">
          <span aria-hidden="true">\u{1D54F}</span><span class="ds-share-label">X</span>
        </a>
        <a class="ds-btn" data-action="line" href="${d(D({text:t.text,author:t.author}))}" target="_blank" rel="noopener noreferrer" aria-label="${d(o.shareLine)}">
          <span aria-hidden="true">L</span><span class="ds-share-label">LINE</span>
        </a>
      </div>
      <span class="ds-powered"><a href="https://personal-site-mocha-chi.vercel.app" target="_blank" rel="noopener noreferrer">${o.poweredBy}</a></span>
    </div>
  `;let a=e.querySelector('[data-action="copy"]');a&&a.addEventListener("click",async()=>{if(await U({text:t.text,author:t.author})){let s=a.querySelector(".ds-share-label"),h=s?.textContent??"";s&&(s.textContent=o.copied),a.classList.add("ds-toast"),setTimeout(()=>{s&&(s.textContent=h),a.classList.remove("ds-toast")},2e3)}})}function W(e,t,n){e.className=`ds-card ds-${n}`;let r=y(t);e.innerHTML=`<p class="ds-error">${d(r.loadFailed)}</p>`}async function V(e,t){let n=e.replace(/\/$/,""),r=`${n}/schedule-${t}.json`;try{let l=await fetch(r,n===""?{credentials:"omit"}:{credentials:"omit",mode:"cors"});return l.ok?await l.json():null}catch{return null}}function Z(e){let t=P(),n=e.entries[t];if(n&&e.quotes[n])return e.quotes[n];let r=Object.keys(e.quotes).sort()[0];return r&&e.quotes[r]?(console.warn("[daily-soup] today entry missing or stale, falling back to first quote"),e.quotes[r]):null}function ee(e,t,n){let r=k(t);r&&(r.bg&&e.style.setProperty("--ds-bg",r.bg),r.ink&&e.style.setProperty("--ds-fg",r.ink),r.muted&&e.style.setProperty("--ds-muted",r.muted),r.border&&e.style.setProperty("--ds-border",r.border),r.accent&&e.style.setProperty("--ds-accent",r.accent)),n&&e.style.setProperty("--ds-max-width",n)}function f(e,t={}){let n=t.lang??"zh",r=t.theme??"auto",o=t.scheduleUrl===void 0?F:t.scheduleUrl,l=t.maxWidth,i=E(r),a=G(e);if(a===e)e.textContent="";else for(;a.firstChild;)a.removeChild(a.firstChild);Y(a);let m=J(i);ee(m,r,l),a.appendChild(m);let s={lang:n,themeConfig:r,scheduleUrl:o,host:e,root:a,cardEl:m,unwatchTheme:()=>{}};r==="auto"&&(s.unwatchTheme=$(u=>{i=u,s.cardEl.classList.remove("ds-light","ds-dark"),s.cardEl.classList.add(`ds-${u}`)}));let h=!1,w=!1,v=async()=>{let u=await V(o,n);if(h)return;if(!u){if(!w){w=!0,setTimeout(v,2e3);return}W(s.cardEl,n,i);return}let x=Z(u);if(!x){W(s.cardEl,n,i);return}K(s.cardEl,x,n,i)};return v(),{destroy(){if(h=!0,s.unwatchTheme(),a===e)e.textContent="";else if(e.shadowRoot)for(;e.shadowRoot.firstChild;)e.shadowRoot.removeChild(e.shadowRoot.firstChild)}}}function p(e="[data-daily-soup], #daily-soup"){if(typeof document>"u")return[];let t=document.querySelectorAll(e),n=[];return t.forEach(r=>{let o=r.dataset.lang??"zh",l=r.dataset.theme??"auto",i=r.dataset.scheduleUrl,a=r.dataset.maxWidth;n.push(f(r,{lang:o,theme:l,scheduleUrl:i,maxWidth:a}))}),n}var F,g=c(()=>{"use strict";L();M();z();I();A();F="https://daily-soup-widget.vercel.app"});var te={};T(te,{mount:()=>f,mountAll:()=>p});g();g();function N(){let e=p();return typeof window<"u"&&(window.DailySoup=window.DailySoup??{},Promise.resolve().then(()=>(g(),_)).then(({mount:t})=>{window.DailySoup&&(window.DailySoup.mount=t,window.DailySoup.mountAll=p)})),e}typeof document<"u"&&(document.readyState==="loading"?document.addEventListener("DOMContentLoaded",N,{once:!0}):N());return Q(te);})();
//# sourceMappingURL=embed.js.map
