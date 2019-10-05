'use strict';
(function () {
  var KEY_ENTER = 13;
  var KEY_ESCAPE = 27;


  window.util = {
    isEnterEvent: function isEnterEvent(evt, action) {
      if (evt.keyCode === KEY_ENTER) {
        action();
      }
    },
    isEscEvent: function isEscrEvent(evt, action) {
      if (evt.keyCode === KEY_ESCAPE) {
        action();
      }
    }
  };
})();

