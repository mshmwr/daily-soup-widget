import { describe, expect, it } from 'vitest';
import { buildXShareUrl, buildLineShareUrl } from '../../src/share';

const content = { text: '千里之行，始於足下。', author: '老子' };

describe('buildXShareUrl', () => {
  it('includes the encoded text + author + canonical URL', () => {
    const url = buildXShareUrl(content);
    expect(url).toMatch(/twitter\.com\/intent\/tweet/);
    expect(url).toContain(encodeURIComponent('千里之行，始於足下。'));
    expect(url).toContain(encodeURIComponent('老子'));
    expect(url).toContain(encodeURIComponent('https://daily-soup-widget.vercel.app'));
  });
});

describe('buildLineShareUrl', () => {
  it('points to the LINE share endpoint with an encoded payload', () => {
    const url = buildLineShareUrl(content);
    expect(url).toMatch(/social-plugins\.line\.me\/lineit\/share/);
    expect(url).toContain(encodeURIComponent('千里之行，始於足下。'));
  });
});
