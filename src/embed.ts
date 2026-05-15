import { mountAll } from './widget';

declare global {
  interface Window {
    DailySoup?: { mount: typeof import('./widget').mount; mountAll: typeof mountAll };
  }
}

function init() {
  const handles = mountAll();
  if (typeof window !== 'undefined') {
    window.DailySoup = window.DailySoup ?? ({} as Window['DailySoup']);
    // expose mount + mountAll for advanced consumers
    import('./widget').then(({ mount }) => {
      if (window.DailySoup) {
        window.DailySoup.mount = mount;
        window.DailySoup.mountAll = mountAll;
      }
    });
  }
  return handles;
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
}

export { mount, mountAll } from './widget';
