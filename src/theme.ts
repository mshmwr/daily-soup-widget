import type { ThemeConfig, ResolvedTheme, ThemeColors } from './types';

function isThemeColors(config: ThemeConfig): config is ThemeColors {
  return typeof config === 'object' && config !== null;
}

export function resolveTheme(config: ThemeConfig): ResolvedTheme {
  if (isThemeColors(config)) return config.base ?? 'light';
  if (config === 'light' || config === 'dark') return config;
  if (typeof window === 'undefined' || !window.matchMedia) return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function getThemeColors(config: ThemeConfig): ThemeColors | null {
  return isThemeColors(config) ? config : null;
}

export function watchSystemTheme(cb: (theme: ResolvedTheme) => void): () => void {
  if (typeof window === 'undefined' || !window.matchMedia) return () => {};
  const mql = window.matchMedia('(prefers-color-scheme: dark)');
  const handler = (e: MediaQueryListEvent) => cb(e.matches ? 'dark' : 'light');
  mql.addEventListener('change', handler);
  return () => mql.removeEventListener('change', handler);
}
