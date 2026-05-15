import { describe, expect, it, beforeEach, vi } from 'vitest';
import { resolveTheme } from '../../src/theme';

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
});
