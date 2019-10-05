'use strict';
(function () {
  var dragged = false;

  function dialogHandlePicMouseDownHandler(evt) {
    evt.preventDefault();
    var origin = {
      'x': evt.clientX,
      'y': evt.clientY
    };

    function mouseMoveHandler(moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        'x': origin.x - moveEvt.clientX,
        'y': origin.y - moveEvt.clientY,
      };

      origin = {
        'x': moveEvt.clientX,
        'y': moveEvt.clientY
      };

      setup.style.top = (setup.offsetTop - shift.y) + 'px';
      setup.style.left = (setup.offsetLeft - shift.x) + 'px';
    }

    function mouseUpHandler(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mousemove', mouseUpHandler);

      if (dragged) {
        dialogHandle.addEventListener('click', function preventDefaultClickHandler(clickEvt) {
          clickEvt.preventDefault();
          dialogHandle.removeEventListener('click', preventDefaultClickHandler);
          dragged = false;
        });
      }
    }

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  }

  /**
   * close the popup
   */
  function closePopup() {
    setup.classList.add('hidden');
    setup.removeAttribute('style');
    document.removeEventListener('keydown', popupKeydownEscHandler);
    closeButtonSetup.removeEventListener('click', closeSetupClickHandler);
    closeButtonSetup.removeEventListener('keydown', closeSetupKeydownEnterHandler);

    dialogHandle.removeEventListener('mousedown', dialogHandlePicMouseDownHandler);
  }

  /**
   * close popup by click
   */
  function closeSetupClickHandler() {
    closePopup();
  }

  /**
   * close popup by press Enter
   * @param {*} evt
   */
  function closeSetupKeydownEnterHandler(evt) {
    window.util.isEnterEvent(evt, closePopup);

  }

  /**
   * close popup by press Esc
   * @param {*} evt
   */
  function popupKeydownEscHandler(evt) {
    if (document.activeElement !== userNameSetup) {
      window.util.isEscEvent(evt, closePopup);
    }
  }


  /**
   * open the popup
   */
  function openPopup() {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', popupKeydownEscHandler);
    closeButtonSetup.addEventListener('click', closeSetupClickHandler);
    closeButtonSetup.addEventListener('keydown', closeSetupKeydownEnterHandler);

    window.colorize.changeColorByClick(setupWizardCoat, window.colorize.COAT_COLOR);
    window.colorize.changeColorByClick(setupWizardEyes, window.colorize.EYE_COLOR);
    window.colorize.changeColorByClick(setupWizardFireball, window.colorize.FIREBALL_COLOR);

    dialogHandle.addEventListener('mousedown', dialogHandlePicMouseDownHandler);
  }

  /**
   * open popup by click
   */
  function openSetupClickHandler() {
    openPopup();
  }

  /**
   * open popup by press Enter
   * @param {*} evt
   */
  function OpenSetupKeydownEnterHandler(evt) {
    window.util.isEnterEvent(evt, openPopup);
  }

  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupOpenIcon = document.querySelector('.setup-open-icon');

  var closeButtonSetup = setup.querySelector('.setup-close');
  var userNameSetup = setup.querySelector('.setup-user-name');

  var setupWizardCoat = document.querySelector('.wizard-coat');
  var setupWizardEyes = document.querySelector('.wizard-eyes');
  var setupWizardFireball = document.querySelector('.setup-fireball-wrap');

  var dialogHandle = setup.querySelector('.upload');

  setupOpen.addEventListener('click', openSetupClickHandler);
  setupOpenIcon.addEventListener('keydown', OpenSetupKeydownEnterHandler);
})();

