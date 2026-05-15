import { describe, expect, it } from 'vitest';
import { t } from '../../src/i18n';

describe('t', () => {
  it('returns zh strings for zh', () => {
    expect(t('zh').copy).toBe('複製');
    expect(t('zh').poweredBy).toContain('mshmwr');
  });

  it('returns en strings for en', () => {
    expect(t('en').copy).toBe('Copy');
    expect(t('en').source).toBe('Source');
  });

  it('falls back to zh for unknown lang', () => {
    // @ts-expect-error intentional bad input
    expect(t('fr').copy).toBe('複製');
  });
});
