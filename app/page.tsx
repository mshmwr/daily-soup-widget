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
<script src="https://daily-soup.vercel.app/embed.js" async></script>`}</code></pre>
        <p>
          Optional config via <code>data-*</code> attributes on the mount node:
          <code> data-lang="en"</code>, <code>data-theme="dark"</code>.
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
            <tr><td><code>lang</code></td><td><code>zh</code> / <code>en</code></td><td><code>zh</code></td></tr>
            <tr><td><code>theme</code></td><td><code>auto</code> / <code>light</code> / <code>dark</code></td><td><code>auto</code></td></tr>
            <tr><td><code>scheduleUrl</code></td><td>any HTTPS URL</td><td>hosted CDN</td></tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>About</h2>
        <p>
          Content seed: 30 growth-themed quotes spanning 行動, 學習, 堅持, 心態, 蛻變, 使命.
          Public-domain classical works + PD-in-Taiwan modern works, with attribution.
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
          <a href="https://coco-c.dev" target="_blank" rel="noopener noreferrer">coco-c.dev</a>
        </p>
      </section>

      <div className="footer">
        Built by <a href="https://coco-c.dev" target="_blank" rel="noopener noreferrer">coco</a>.
        Quotes deterministically scheduled by UTC+8 day; past dates never change once published.
      </div>
    </main>
  );
}
