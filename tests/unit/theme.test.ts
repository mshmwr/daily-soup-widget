import { describe, expect, it, beforeEach, vi } from 'vitest';
import { resolveTheme, getThemeColors } from '../../src/theme';

describe('resolveTheme', () => {
  beforeEach(() => {
    vi.unstubAllGlobals();
  });

  it('returns explicit light/dark verbatim regardless of system preference', () => {
    vi.stubGlobal('window', {
      matchMedia: () => ({ matches: true, addEventListener() {}, removeEventListener() {} }),
    });
    expect(resolveTheme('light')).toBe('light');
    expect(resolveTheme('dark')).toBe('dark');
  });

  it('auto resolves to dark when prefers-color-scheme: dark matches', () => {
    vi.stubGlobal('window', {
      matchMedia: (q: string) => ({
        matches: q.includes('dark'),
        addEventListener() {},
        removeEventListener() {},
      }),
    });
    expect(resolveTheme('auto')).toBe('dark');
  });

  it('auto resolves to light when prefers-color-scheme: dark does not match', () => {
    vi.stubGlobal('window', {
      matchMedia: () => ({ matches: false, addEventListener() {}, removeEventListener() {} }),
    });
    expect(resolveTheme('auto')).toBe('light');
  });

  it('object theme without base defaults to light', () => {
    expect(resolveTheme({ bg: '#fff8ee' })).toBe('light');
  });

  it('object theme with explicit base returns base', () => {
    expect(resolveTheme({ base: 'dark', bg: '#000' })).toBe('dark');
  });
});

describe('getThemeColors', () => {
  it('returns null for string themes', () => {
    expect(getThemeColors('auto')).toBeNull();
    expect(getThemeColors('light')).toBeNull();
    expect(getThemeColors('dark')).toBeNull();
  });

  it('returns the object itself for object themes', () => {
    const obj = { base: 'light' as const, bg: '#fff8ee', border: 'transparent' };
    expect(getThemeColors(obj)).toBe(obj);
  });
});
