import { useEffect, useRef } from 'react';
import { mount } from './widget';
import type { DailySoupProps } from './types';

export function DailySoup({ lang = 'zh', theme = 'auto', scheduleUrl, className, maxWidth }: DailySoupProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);

  const themeKey = typeof theme === 'string' ? theme : JSON.stringify(theme);
  useEffect(() => {
    if (!hostRef.current) return;
    const handle = mount(hostRef.current, { lang, theme, scheduleUrl, maxWidth });
    return () => handle.destroy();
  }, [lang, themeKey, scheduleUrl, maxWidth]);

  return <div ref={hostRef} className={className} data-daily-soup-host="" />;
}
