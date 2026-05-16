import { describe, expect, it } from 'vitest';
import { buildSchedule } from '../../scripts/build-schedule';
import type { Lang, Schedule } from '../../scripts/build-schedule';

function q(id: string, lang: Lang) {
  return {
    id,
    lang,
    text: `quote-${id}`,
    author: `author-${id}`,
    source: `source-${id}`,
    sourceUrl: '',
    attribution: 'verified',
    dimension: 'action',
    style: 'classical',
  } as const;
}

describe('buildSchedule', () => {
  const pool: ReturnType<typeof q>[] = [
    q('0001', 'zh'),
    q('0002', 'zh'),
    q('0003', 'zh'),
  ];

  it('round-robins through the language pool in id order', () => {
    const s = buildSchedule('zh', pool, {
      launchDate: '2026-05-15',
      today: '2026-05-15',
      forwardDays: 5,
    });
    expect(s.entries['2026-05-15']).toBe('0001');
    expect(s.entries['2026-05-16']).toBe('0002');
    expect(s.entries['2026-05-17']).toBe('0003');
    expect(s.entries['2026-05-18']).toBe('0001');
    expect(s.entries['2026-05-19']).toBe('0002');
  });

  it('preserves existing entries when extending the window', () => {
    const initial = buildSchedule('zh', pool, {
      launchDate: '2026-05-15',
      today: '2026-05-15',
      forwardDays: 2,
    });
    const reduced = [pool[0]!, pool[2]!];
    const extended = buildSchedule('zh', reduced, {
      launchDate: '2026-05-15',
      today: '2026-05-15',
      forwardDays: 5,
      existing: initial,
    });
    expect(extended.entries['2026-05-15']).toBe(initial.entries['2026-05-15']);
    expect(extended.entries['2026-05-16']).toBe(initial.entries['2026-05-16']);
    expect(extended.entries['2026-05-17']).toBe(initial.entries['2026-05-17']);
    expect(extended.entries['2026-05-18']).toBeDefined();
  });

  it('emits a quotes pool containing only entries for the requested lang', () => {
    const s = buildSchedule('zh', pool, {
      launchDate: '2026-05-15',
      today: '2026-05-15',
      forwardDays: 2,
    });
    expect(Object.keys(s.quotes).sort()).toEqual(['0001', '0002', '0003']);
  });

  it('throws when no quotes match the requested lang', () => {
    expect(() =>
      buildSchedule('zh', [], {
        launchDate: '2026-05-15',
        today: '2026-05-15',
        forwardDays: 1,
      }),
    ).toThrow(/lang=zh/);
  });
});
