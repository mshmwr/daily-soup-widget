const SHARE_URL = 'https://daily-soup-widget.vercel.app';

export interface ShareContent {
  text: string;
  author: string;
}

export async function copyToClipboard(content: ShareContent): Promise<boolean> {
  const payload = `${content.text} — ${content.author}`;
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(payload);
      return true;
    } catch {
      return false;
    }
  }
  return false;
}

export function buildXShareUrl(content: ShareContent): string {
  const text = encodeURIComponent(`${content.text} — ${content.author}`);
  const url = encodeURIComponent(SHARE_URL);
  return `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
}

export function buildLineShareUrl(content: ShareContent): string {
  const url = encodeURIComponent(`${SHARE_URL} — ${content.text}`);
  return `https://social-plugins.line.me/lineit/share?url=${url}`;
}
