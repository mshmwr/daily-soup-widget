export type Lang = 'zh' | 'en';
export type ThemeConfig = 'auto' | 'light' | 'dark';
export type ResolvedTheme = 'light' | 'dark';

export interface Quote {
  text: string;
  author: string;
  source: string;
  sourceUrl: string;
  attribution: 'verified' | 'popular-attribution' | 'proverb';
  dimension: string;
  style: string;
}

export interface Schedule {
  launchDate: string;
  generatedAt: string;
  lang: Lang;
  entries: Record<string, string>;
  quotes: Record<string, Quote>;
}

export interface MountOptions {
  lang?: Lang;
  theme?: ThemeConfig;
  scheduleUrl?: string;
}

export interface DailySoupProps {
  lang?: Lang;
  theme?: ThemeConfig;
  scheduleUrl?: string;
  className?: string;
}
