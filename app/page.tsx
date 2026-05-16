import { DemoBoard } from './DemoBoard';

export default function HomePage() {
  return (
    <main>
      <h1>Daily Soup</h1>
      <p className="lede">
        Embeddable growth-themed daily quote widget. Drop a <code>&lt;script&gt;</code> tag or
        <code> npm install</code>. Same deterministic quote everywhere, every day. Shadow-DOM
        isolated; container-query RWD; light/dark auto.
      </p>

      <section>
        <h2>Live demo</h2>
        <DemoBoard />
      </section>

      <section>
        <h2>Install — script tag</h2>
        <pre><code>{`<div id="daily-soup"></div>
<script src="https://daily-soup-widget.vercel.app/embed.js" async></script>`}</code></pre>
        <p>
          Optional config via <code>data-*</code> attributes on the mount node:
          <code> data-theme="dark"</code>, <code>data-max-width="640px"</code>.
        </p>
      </section>

      <section>
        <h2>Install — NPM (React)</h2>
        <pre><code>{`npm install daily-soup-widget`}</code></pre>
        <pre><code>{`import { DailySoup } from 'daily-soup-widget';

export default function Page() {
  return <DailySoup lang="zh" theme="auto" />;
}`}</code></pre>
      </section>

      <section>
        <h2>Configuration</h2>
        <table>
          <thead>
            <tr><th>Option</th><th>Values</th><th>Default</th></tr>
          </thead>
          <tbody>
            <tr><td><code>lang</code></td><td><code>zh</code></td><td><code>zh</code></td></tr>
            <tr><td><code>theme</code></td><td><code>auto</code> / <code>light</code> / <code>dark</code></td><td><code>auto</code></td></tr>
            <tr><td><code>scheduleUrl</code></td><td>any HTTPS URL</td><td>hosted CDN</td></tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>About</h2>
        <p>
          Content seed: 30 中文成長主題語錄，涵蓋 行動、學習、堅持、心態、蛻變 五個維度。
          全為公共領域古典詩文（蘇軾、屈原、論語、孟子等），附原典出處連結。
        </p>
        <p>
          <a href="https://github.com/mshmwr/daily-soup-widget" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          {' · '}
          <a href="https://github.com/mshmwr/daily-soup-widget/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">
            MIT License
          </a>
          {' · '}
          <a href="https://personal-site-mocha-chi.vercel.app" target="_blank" rel="noopener noreferrer">mshmwr</a>
        </p>
      </section>

      <div className="footer">
        Built by <a href="https://personal-site-mocha-chi.vercel.app" target="_blank" rel="noopener noreferrer">mshmwr</a>.
        Quotes deterministically scheduled by UTC+8 day; past dates never change once published.
      </div>
    </main>
  );
}
