import { describe, expect, it } from 'vitest';
import { todayUtc8 } from '../../src/date';

describe('todayUtc8', () => {
  it('returns YYYY-MM-DD in UTC+8 for a known UTC instant', () => {
    // 2026-05-15T15:30:00Z = 2026-05-15 23:30 UTC+8
    const d = new Date('2026-05-15T15:30:00Z');
    expect(todayUtc8(d)).toBe('2026-05-15');
  });

  it('rolls forward across the UTC+8 day boundary', () => {
    // 2026-05-15T16:30:00Z = 2026-05-16 00:30 UTC+8
    const d = new Date('2026-05-15T16:30:00Z');
    expect(todayUtc8(d)).toBe('2026-05-16');
  });

  it('returns earlier date before the UTC+8 boundary', () => {
    // 2026-05-15T15:59:59Z = 2026-05-15 23:59:59 UTC+8
    const d = new Date('2026-05-15T15:59:59Z');
    expect(todayUtc8(d)).toBe('2026-05-15');
  });
});
