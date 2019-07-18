'use strict';

(function () {

  var lastTimeout = null;

  var debounce = function (cb, ms) {

    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }
    lastTimeout = setTimeout(function () {
      cb();
    }, ms);
  };

  window.debounce = debounce;
})();
