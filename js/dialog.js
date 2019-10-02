'use strict';

var KEY_ENTER = 13;
var KEY_ESCAPE = 27;


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
 * open the popup
 */
function openPopup() {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', popupKeydownEscHandler);
}

/**
 * close the popup
 */
function closePopup() {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', popupKeydownEscHandler);

  setupWizardCoat.removeEventListener('click', wizardCoatClickHandler);
  setupWizardEyes.removeEventListener('click', wizardEyesClickHandler);
  setupWizardFireball.removeEventListener('click', wizardFireballClickHandler);
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
    newColor = newColor = featureList[NEXT_COLOR_INDEX];
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
  if (evt.keyCode === KEY_ENTER) {
    openPopup();
  }
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
  if (evt.keyCode === KEY_ENTER) {
    closePopup();
  }
}

/**
 * close popup by press Esc
 * @param {*} evt
 */
function popupKeydownEscHandler(evt) {
  if (document.activeElement !== userNameSetup && evt.keyCode === KEY_ESCAPE) {
    closePopup();
  }
}

/**
 * set a color of the coat by click
 */
function wizardCoatClickHandler() {
  setFillAttr(setupWizardCoat, COAT_COLORS);
}

/**
 * set a color of the eyes by click
 */
function wizardEyesClickHandler() {
  setFillAttr(setupWizardEyes, EYE_COLORS);
}

/**
 * set a color of the fireball by click
 */
function wizardFireballClickHandler() {
  setBgAttr(setupWizardFireball, FIREBALL_COLOR);
}

var setupOpen = document.querySelector('.setup-open');
var setupOpenIcon = document.querySelector('.setup-open-icon');
var closeButtonSetup = setup.querySelector('.setup-close');
var userNameSetup = setup.querySelector('.setup-user-name');

var setupWizard = document.querySelector('.setup-wizard');
var setupWizardCoat = setupWizard.querySelector('.wizard-coat');
var setupWizardEyes = setupWizard.querySelector('.wizard-eyes');
var setupWizardFireball = document.querySelector('.setup-fireball-wrap');

setupOpen.addEventListener('click', openSetupClickHandler);
setupOpenIcon.addEventListener('keydown', OpenSetupKeydownEnterHandler);

closeButtonSetup.addEventListener('click', closeSetupClickHandler);
closeButtonSetup.addEventListener('keydown', closeSetupKeydownEnterHandler);

setupWizardCoat.addEventListener('click', wizardCoatClickHandler);
setupWizardEyes.addEventListener('click', wizardEyesClickHandler);
setupWizardFireball.addEventListener('click', wizardFireballClickHandler);
