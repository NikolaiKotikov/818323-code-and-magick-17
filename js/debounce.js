'use strict';

(function () {

  window.debounce = function (cb, ms) {
    if (window.lastTimeout) {
      clearTimeout(window.lastTimeout);
    }
    window.lastTimeout = setTimeout(function () {
      cb();
    }, ms);
  };
})();
