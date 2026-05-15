import { useEffect, useRef } from 'react';
import { mount } from './widget';
import type { DailySoupProps } from './types';

export function DailySoup({ lang = 'zh', theme = 'auto', scheduleUrl, className }: DailySoupProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hostRef.current) return;
    const handle = mount(hostRef.current, { lang, theme, scheduleUrl });
    return () => handle.destroy();
  }, [lang, theme, scheduleUrl]);

  return <div ref={hostRef} className={className} data-daily-soup-host="" />;
}
