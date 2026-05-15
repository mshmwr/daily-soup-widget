'use client';

import dynamic from 'next/dynamic';

const DailySoup = dynamic(
  () => import('../src/component').then((mod) => mod.DailySoup),
  { ssr: false },
);

export function DemoBoard() {
  return (
    <div className="grid-demo">
      <div>
        <div className="demo-label">zh · auto theme · narrow container</div>
        <div className="demo-narrow">
          <DailySoup lang="zh" theme="auto" scheduleUrl="" />
        </div>
      </div>
      <div>
        <div className="demo-label">en · light · standard</div>
        <DailySoup lang="en" theme="light" scheduleUrl="" />
      </div>
      <div>
        <div className="demo-label">zh · dark · wide</div>
        <div className="demo-wide">
          <DailySoup lang="zh" theme="dark" scheduleUrl="" />
        </div>
      </div>
    </div>
  );
}
