'use strict';
(function () {
  var FIREBALL_COLOR = [
    'rgb(238, 72, 48)',
    'rgb(48, 168, 238)',
    'rgb(92, 230, 192)',
    'rgb(232, 72, 213)',
    'rgb(230, 232, 72)'
  ];

  var NEXT_COLOR_INDEX = 1;

  var dragged = false;

  /**
   * increment index within length of list
   * @param {number} currentIndex
   * @param {Array} listOfElements
   * @return {number}
   */
  function changeIndex(currentIndex, listOfElements) {
    var newIndex;
    if (currentIndex === listOfElements.length - 1) {
      newIndex = 0;
    } else {
      newIndex = currentIndex + 1;
    }
    return newIndex;
  }

  /**
   * set next fill value of an element from a list
   * @param {object} element
   * @param {array} featureList
   */
  function setFillAttr(element, featureList) {
    var attrValue = element.getAttribute('style');
    var currentColor;
    var currentIndex;
    var newIndex;
    var newColor;

    if (attrValue === null) {
      newColor = featureList[NEXT_COLOR_INDEX];
    } else {
      currentColor = attrValue.slice(6, attrValue.length);
      currentIndex = featureList.indexOf(currentColor);
      newIndex = changeIndex(currentIndex, featureList);
      newColor = featureList[newIndex];
    }

    element.setAttribute('style', 'fill: ' + newColor);
  }

  /**
   * set next background-color value of an element from a list
   * @param {object} element
   * @param {array} featureList
   */
  function setBgAttr(element, featureList) {
    var currentColor = element.style.backgroundColor;
    var currentIndex;
    var newIndex;
    var newColor;

    if (currentColor === '') {
      newColor = featureList[NEXT_COLOR_INDEX];
    } else {
      currentIndex = featureList.indexOf(currentColor);
      newIndex = changeIndex(currentIndex, featureList);
      newColor = featureList[newIndex];
    }

    element.style.backgroundColor = newColor;
  }

  /**
   * set a color of the coat by click
   */
  function wizardCoatClickHandler() {
    setFillAttr(setupWizardCoat, window.setup.COAT_COLORS);
  }

  /**
   * set a color of the eyes by click
   */
  function wizardEyesClickHandler() {
    setFillAttr(setupWizardEyes, window.setup.EYE_COLORS);
  }

  /**
   * set a color of the fireball by click
   */
  function wizardFireballClickHandler() {
    setBgAttr(setupWizardFireball, FIREBALL_COLOR);
  }

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
    closeButtonSetup.addEventListener('click', closeSetupClickHandler);
    closeButtonSetup.addEventListener('keydown', closeSetupKeydownEnterHandler);

    setupWizardCoat.removeEventListener('click', wizardCoatClickHandler);
    setupWizardEyes.removeEventListener('click', wizardEyesClickHandler);
    setupWizardFireball.removeEventListener('click', wizardFireballClickHandler);

    dialogHandle.addEventListener('mousedown', dialogHandlePicMouseDownHandler);
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

    setupWizardCoat.addEventListener('click', wizardCoatClickHandler);
    setupWizardEyes.addEventListener('click', wizardEyesClickHandler);
    setupWizardFireball.addEventListener('click', wizardFireballClickHandler);

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

