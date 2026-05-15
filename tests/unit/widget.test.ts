import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest';
import { mount } from '../../src/widget';

describe('mount — theme overrides + maxWidth', () => {
  let host: HTMLElement;

  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false }));
    host = document.createElement('div');
    document.body.appendChild(host);
  });

  afterEach(() => {
    host.remove();
    vi.unstubAllGlobals();
  });

  function getCard(): HTMLElement {
    const root = host.shadowRoot ?? host;
    const card = root.querySelector<HTMLElement>('.ds-card');
    if (!card) throw new Error('card not found');
    return card;
  }

  it('sets --ds-max-width inline when maxWidth provided', () => {
    mount(host, { maxWidth: '100%' });
    expect(getCard().style.getPropertyValue('--ds-max-width')).toBe('100%');
  });

  it('does not set --ds-max-width when not provided', () => {
    mount(host, {});
    expect(getCard().style.getPropertyValue('--ds-max-width')).toBe('');
  });

  it('applies theme color overrides as CSS custom properties', () => {
    mount(host, {
      theme: { base: 'light', bg: '#fff8ee', ink: '#222', accent: '#5b6b9e', border: 'transparent' },
    });
    const card = getCard();
    expect(card.style.getPropertyValue('--ds-bg')).toBe('#fff8ee');
    expect(card.style.getPropertyValue('--ds-fg')).toBe('#222');
    expect(card.style.getPropertyValue('--ds-accent')).toBe('#5b6b9e');
    expect(card.style.getPropertyValue('--ds-border')).toBe('transparent');
    expect(card.classList.contains('ds-light')).toBe(true);
  });

  it('object theme with base: dark applies ds-dark class', () => {
    mount(host, { theme: { base: 'dark', bg: '#0a0a0a' } });
    expect(getCard().classList.contains('ds-dark')).toBe(true);
  });

  it('string theme does not set inline color overrides', () => {
    mount(host, { theme: 'light' });
    const card = getCard();
    expect(card.style.getPropertyValue('--ds-bg')).toBe('');
    expect(card.style.getPropertyValue('--ds-fg')).toBe('');
  });
});
