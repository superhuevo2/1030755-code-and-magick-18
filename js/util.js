'use strict';
(function () {
  var KEY_ENTER = 13;
  var KEY_ESCAPE = 27;

  function isEnterEvent(evt, action) {
    if (evt.keyCode === KEY_ENTER) {
      action();
    }
  }

  function isEscEvent(evt, action) {
    if (evt.keyCode === KEY_ESCAPE) {
      action();
    }
  }


  window.util = {
    isEnterEvent: isEnterEvent,
    isEscEvent: isEscEvent
  };
})();

