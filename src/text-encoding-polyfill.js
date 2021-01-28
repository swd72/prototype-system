// text-encoding-polyfill.js
;(function (window) {
    if (typeof window.TextEncoder !== 'function') {
      const TextEncodingPolyfill = require('text-encoding');
      window.TextEncoder = TextEncodingPolyfill.TextEncoder;
      window.TextDecoder = TextEncodingPolyfill.TextDecoder;
    }
  }(window));