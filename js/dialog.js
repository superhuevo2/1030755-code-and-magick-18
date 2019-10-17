'use strict';
(function () {
  var getNextColor = window.colorize.getNextColor;
  var COAT_COLOR = window.colorize.COAT_COLOR;
  var EYE_COLOR = window.colorize.EYE_COLOR;
  var FIREBALL_COLOR = window.colorize.FIREBALL_COLOR;
  var isEnterEvent = window.util.isEnterEvent;
  var isEscEvent = window.util.isEscEvent;
  var save = window.backend.save;


  var dragged = false;

  function moveDialogHandler(evt) {
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

    setupWizardCoat.removeEventListener('click', coatClickHandler);
    setupWizardEyes.removeEventListener('click', eyesClickHandler);
    setupWizardFireball.removeEventListener('click', fireballClickHandler);

    dialogHandle.removeEventListener('mousedown', moveDialogHandler);
    form.addEventListener('submit', formSubmitHandler);
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
    isEnterEvent(evt, closePopup);

  }

  /**
   * close popup by press Esc
   * @param {*} evt
   */
  function popupKeydownEscHandler(evt) {
    if (document.activeElement !== userNameSetup) {
      isEscEvent(evt, closePopup);
    }
  }

  function createErrorPopup(message) {
    var element = document.createElement('div');
    element.innerHTML = 'Error ' + message + '<br>Press any key';
    element.classList.add('error');
    body.appendChild(element);
    document.addEventListener('click', function () {
      element.remove();
    });
    document.addEventListener('keydown', function () {
      element.remove();
    });
  }


  function formSubmitHandler(evt) {
    evt.preventDefault();
    var data = new FormData(form);
    save(data, closePopup, createErrorPopup);
  }

  function coatClickHandler() {
    getNextColor(setupWizardCoat, COAT_COLOR);
  }

  function eyesClickHandler() {
    getNextColor(setupWizardEyes, EYE_COLOR);
  }

  function fireballClickHandler() {
    getNextColor(setupWizardFireball, FIREBALL_COLOR);
  }


  /**
   * open the popup
   */
  function openPopup() {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', popupKeydownEscHandler);
    closeButtonSetup.addEventListener('click', closeSetupClickHandler);
    closeButtonSetup.addEventListener('keydown', closeSetupKeydownEnterHandler);

    setupWizardCoat.addEventListener('click', coatClickHandler);
    setupWizardEyes.addEventListener('click', eyesClickHandler);
    setupWizardFireball.addEventListener('click', fireballClickHandler);

    dialogHandle.addEventListener('mousedown', moveDialogHandler);
    form.addEventListener('submit', formSubmitHandler);
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
  function openSetupKeydownEnterHandler(evt) {
    isEnterEvent(evt, openPopup);
  }

  var body = document.querySelector('body');
  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupOpenIcon = document.querySelector('.setup-open-icon');

  var closeButtonSetup = setup.querySelector('.setup-close');
  var userNameSetup = setup.querySelector('.setup-user-name');

  var setupWizardCoat = document.querySelector('.wizard-coat');
  var setupWizardEyes = document.querySelector('.wizard-eyes');
  var setupWizardFireball = document.querySelector('.setup-fireball-wrap');

  var dialogHandle = setup.querySelector('.upload');
  var form = setup.querySelector('.setup-wizard-form');

  setupOpen.addEventListener('click', openSetupClickHandler);
  setupOpenIcon.addEventListener('keydown', openSetupKeydownEnterHandler);

  window.dialog = {
    createErrorPopup: createErrorPopup
  };

})();

