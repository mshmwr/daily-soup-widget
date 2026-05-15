import type { Lang } from './types';

interface UiStrings {
  copy: string;
  copied: string;
  share: string;
  source: string;
  poweredBy: string;
  attributedPopular: string;
  shareX: string;
  shareLine: string;
  loadFailed: string;
}

const STRINGS: Record<Lang, UiStrings> = {
  zh: {
    copy: '複製',
    copied: '已複製',
    share: '分享',
    source: '出處',
    poweredBy: '由 mshmwr 提供',
    attributedPopular: '傳統歸屬',
    shareX: '分享到 X',
    shareLine: '分享到 LINE',
    loadFailed: '本日小語載入失敗',
  },
  en: {
    copy: 'Copy',
    copied: 'Copied!',
    share: 'Share',
    source: 'Source',
    poweredBy: 'powered by mshmwr',
    attributedPopular: 'popularly attributed',
    shareX: 'Share on X',
    shareLine: 'Share on LINE',
    loadFailed: 'Failed to load daily quote',
  },
};

export function t(lang: Lang): UiStrings {
  return STRINGS[lang] ?? STRINGS.zh;
}

export type { UiStrings };
