
/**
 * Vivexa Tech — Hosted Watermark Widget
 * Intended URL: https://vivexatech.in/watermark.js
 *
 * Usage:
 * <script src="https://vivexatech.in/watermark.js" defer></script>
 */
(function (window, document) {
  'use strict';

  var GLOBAL_KEY = '__VIVEXA_WATERMARK__';
  var ROOT_ID = 'vivexa-watermark-root';
  var STYLE_ID = 'vivexa-watermark-styles';

  var BRAND_URL = 'https://vivexatech.in/';
  var LOGO_URL = 'https://www.vivexatech.in/logo.svg';

  // Prevent duplicate initialization.
  if (window[GLOBAL_KEY]) {
    return;
  }

  window[GLOBAL_KEY] = {
    version: '1.1.0',
    mounted: false
  };

  var state = window[GLOBAL_KEY];

  var CSS = `
    #${ROOT_ID} {
      position: fixed !important;
      right: max(12px, env(safe-area-inset-right, 0px)) !important;
      bottom: max(12px, env(safe-area-inset-bottom, 0px)) !important;
      z-index: 2147483647 !important;

      display: inline-flex !important;
      align-items: center !important;
      gap: 7px !important;

      max-width: calc(100vw - 24px) !important;
      padding: 6px 12px !important;
      margin: 0 !important;

      box-sizing: border-box !important;
      border: 1px solid rgba(229, 231, 235, 0.8) !important;
      border-radius: 9999px !important;

      background: rgba(255, 255, 255, 0.85) !important;
      -webkit-backdrop-filter: blur(10px) !important;
      backdrop-filter: blur(10px) !important;

      box-shadow:
        0 1px 2px rgba(0, 0, 0, 0.05),
        0 4px 12px rgba(0, 0, 0, 0.05) !important;

      color: #4b5563 !important;
      font-family:
        -apple-system, BlinkMacSystemFont, "Segoe UI",
        Roboto, Helvetica, Arial, sans-serif !important;
      font-size: 12px !important;
      font-weight: 400 !important;
      line-height: 1 !important;
      text-decoration: none !important;
      white-space: nowrap !important;

      cursor: pointer !important;
      user-select: none !important;
      -webkit-user-select: none !important;
      -webkit-tap-highlight-color: transparent !important;

      transition:
        background-color 0.2s ease,
        border-color 0.2s ease,
        box-shadow 0.2s ease,
        transform 0.2s cubic-bezier(0.16, 1, 0.3, 1) !important;
    }

    #${ROOT_ID},
    #${ROOT_ID} * {
      box-sizing: border-box !important;
    }

    #${ROOT_ID} .vivexa-watermark-logo {
      display: block !important;
      flex: 0 0 16px !important;

      width: 26px !important;
      height: 26px !important;
      max-width: none !important;

      margin: 0 !important;
      padding: 2px !important;
      border: 0 !important;
      border-radius: 50% !important;

      background: #ffffff !important;
      object-fit: contain !important;
    }

    #${ROOT_ID} .vivexa-watermark-text {
      display: inline !important;
      margin: 0 !important;
      padding: 0 !important;

      color: #4b5563 !important;
      font-size: 12px !important;
      font-weight: 400 !important;
      line-height: 1 !important;
      white-space: nowrap !important;
    }

    #${ROOT_ID} .vivexa-watermark-brand {
      color: #111827 !important;
      font-weight: 600 !important;
      letter-spacing: -0.01em !important;
      transition: color 0.15s ease !important;
    }

    @media (hover: hover) {
      #${ROOT_ID}:hover {
        background: rgba(255, 255, 255, 0.98) !important;
        border-color: rgba(209, 213, 219, 0.9) !important;
        box-shadow:
          0 4px 6px rgba(0, 0, 0, 0.08),
          0 10px 15px rgba(0, 0, 0, 0.08) !important;
        transform: translateY(-2px) !important;
      }

      #${ROOT_ID}:hover .vivexa-watermark-brand {
        color: #0066cc !important;
      }
    }

    #${ROOT_ID}:active {
      transform: translateY(0) !important;
    }

    #${ROOT_ID}:focus-visible {
      outline: 2px solid #6366f1 !important;
      outline-offset: 3px !important;
    }

    @media (max-width: 480px) {
      #${ROOT_ID} {
        gap: 5px !important;
        padding: 5px 10px !important;
      }

      #${ROOT_ID} .vivexa-watermark-logo {
        flex-basis: 14px !important;
        width: 14px !important;
        height: 14px !important;
      }

      #${ROOT_ID} .vivexa-watermark-text {
        font-size: 11px !important;
      }
    }

    @media (prefers-color-scheme: dark) {
      #${ROOT_ID} {
        background: rgba(18, 24, 38, 0.92) !important;
        border-color: rgba(255, 255, 255, 0.12) !important;
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4) !important;
        color: #9ca3af !important;
      }

      #${ROOT_ID} .vivexa-watermark-text {
        color: #9ca3af !important;
      }

      #${ROOT_ID} .vivexa-watermark-brand {
        color: #f3f4f6 !important;
      }
    }

    @media (prefers-color-scheme: dark) and (hover: hover) {
      #${ROOT_ID}:hover {
        background: rgba(24, 32, 47, 0.98) !important;
        border-color: rgba(255, 255, 255, 0.2) !important;
      }

      #${ROOT_ID}:hover .vivexa-watermark-brand {
        color: #38bdf8 !important;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      #${ROOT_ID},
      #${ROOT_ID} .vivexa-watermark-brand {
        transition: none !important;
      }

      #${ROOT_ID}:hover,
      #${ROOT_ID}:active {
        transform: none !important;
      }
    }
  `;

  function injectStyles() {
    if (document.getElementById(STYLE_ID)) {
      return true;
    }

    var style = document.createElement('style');
    style.id = STYLE_ID;
    style.type = 'text/css';
    style.textContent = CSS;

    var head = document.head ||
      document.getElementsByTagName('head')[0];

    if (!head) {
      return false;
    }

    head.appendChild(style);
    return true;
  }

  function createBadge() {
    var link = document.createElement('a');

    link.id = ROOT_ID;
    link.className = 'vivexa-watermark-badge';
    link.href = BRAND_URL;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.setAttribute('aria-label', 'Powered by Vivexa Tech');

    var logo = document.createElement('img');

    logo.className = 'vivexa-watermark-logo';
    logo.src = LOGO_URL;
    logo.alt = '';
    logo.width = 16;
    logo.height = 16;
    logo.decoding = 'async';
    logo.referrerPolicy = 'no-referrer';

    // Hide a broken logo without breaking the watermark.
    logo.addEventListener('error', function () {
      logo.style.display = 'none';
    }, { once: true });

    var text = document.createElement('span');
    text.className = 'vivexa-watermark-text';
    text.appendChild(document.createTextNode('Powered by '));

    var brand = document.createElement('span');
    brand.className = 'vivexa-watermark-brand';
    brand.textContent = 'Vivexa Tech';

    text.appendChild(brand);
    link.appendChild(logo);
    link.appendChild(text);

    return link;
  }

  function mountBadge() {
    if (state.mounted || document.getElementById(ROOT_ID)) {
      state.mounted = true;
      return;
    }

    if (!document.body || !injectStyles()) {
      return;
    }

    document.body.appendChild(createBadge());
    state.mounted = true;
  }

  function initialize() {
    if (!injectStyles()) {
      document.addEventListener('DOMContentLoaded', initialize, {
        once: true
      });
      return;
    }

    if (document.body) {
      mountBadge();
    } else {
      document.addEventListener('DOMContentLoaded', mountBadge, {
        once: true
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize, {
      once: true
    });
  } else {
    initialize();
  }
})(window, document);
