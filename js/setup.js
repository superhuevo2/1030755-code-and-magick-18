'use strict';
// объявление констант

var FIRST_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];
var LAST_NAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];
var COAT_COLORS = [
  'rgb(101,137,164)',
  'rgb(241,43,107)',
  'rgb(146,100,161)',
  'rgb(56,159,117)',
  'rgb(215,210,55)',
  'rgb(0,0,0)'
];
var EYE_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var FIREBALL_COLOR = [
  'rgb(238, 72, 48)',
  'rgb(48, 168, 238)',
  'rgb(92, 230, 192)',
  'rgb(232, 72, 213)',
  'rgb(230, 232, 72)'
];

var NEXT_COLOR_INDEX = [1];

var PROPERTIES = {
  '.setup-similar-label': 'name',
  '.wizard-coat': 'coatColors',
  '.wizard-eyes': 'eyesColors'
};

var NUMBER_OF_WIZARD = 4;

var KEY_ENTER = 13;
var KEY_ESCAPE = 27;

var wizardList = [];

var userDialog = document.querySelector('.setup');
var charactersListElement = userDialog.querySelector('.setup-similar-list');
var similarCharacterBlock = userDialog.querySelector('.setup-similar');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');
var blockSetup = document.querySelector('.setup');
var closeButtonBlockSetup = blockSetup.querySelector('.setup-close');
var userNameBlockSetup = blockSetup.querySelector('.setup-user-name');
var blockSetupOpen = document.querySelector('.setup-open');
var blockSetupOpenIcon = document.querySelector('.setup-open-icon');
var setupWizard = document.querySelector('.setup-wizard');
var setupWizardCoat = setupWizard.querySelector('.wizard-coat');
var setupWizardEyes = setupWizard.querySelector('.wizard-eyes');
var setupWizardFireball = document.querySelector('.setup-fireball-wrap');


// описание функций

/**
 * Returns random element of an array.
 * @param {array} arr collection of elements.
 * @return {string} random element from the collection.
 */
function chooseRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Returns generated name of a wizard
 * @return {object} an object that contains wizard's name and colors of eyes and a coat.
 */
function generateWizard() {
  var wizard = {};

  wizard.name = chooseRandom(FIRST_NAMES) + ' ' + chooseRandom(LAST_NAMES);
  wizard.coatColors = chooseRandom(COAT_COLORS);
  wizard.eyesColors = chooseRandom(EYE_COLORS);

  return wizard;
}

/**
 * made a set of DOM's object from the data and from template
 * @param {object} template a template of DOM's object.
 * @param {array} data a list of objects for writing to template.
 * @param {array} properties an object which shows correspondence between the data and template's properties.
 * @return {object} DOM's object made from template.
 */

function makeFragment(template, data, properties) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < data.length; i++) {
    var element = template.cloneNode(true);

    for (var p in properties) {
      if (properties[p] === 'name') {
        element.querySelector(p).textContent = data[i][properties[p]];
      } else {
        element.querySelector(p).setAttribute('fill', data[i][properties[p]]);
      }
    }
    fragment.appendChild(element);
  }
  return fragment;
}

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
 * close popup by press Escape
 * @param {*} evt
 */
function popupKeydownEscHandler(evt) {
  if (document.activeElement !== userNameBlockSetup && evt.keyCode === KEY_ESCAPE) {
    closePopup();
  }
}

/**
 * open the popup
 */
function openPopup() {
  blockSetup.classList.remove('hidden');
  document.addEventListener('keydown', popupKeydownEscHandler);
}

/**
 * close the popup
 */
function closePopup() {
  blockSetup.classList.add('hidden');
  document.removeEventListener('keydown', popupKeydownEscHandler);

  setupWizardCoat.addEventListener('click', wizardCoatClickHandler);
  setupWizardEyes.addEventListener('click', wizardEyesClickHandler);
  setupWizardFireball.addEventListener('click', wizardFireballClickHandler);
}


function openSetupClickHandler() {
  openPopup();
}


function OpenSetupKeydownEnterHandler(evt) {
  if (evt.keyCode === KEY_ENTER) {
    openPopup();
  }
}


function closeSetupClickHandler() {
  closePopup();
}


function closeSetupKeydownEnterHandler(evt) {
  if (evt.keyCode === KEY_ENTER) {
    closePopup();
  }
}


function wizardCoatClickHandler() {
  setFillAttr(setupWizardCoat, COAT_COLORS);
}


function wizardEyesClickHandler() {
  setFillAttr(setupWizardEyes, EYE_COLORS);
}


function wizardFireballClickHandler() {
  setBgAttr(setupWizardFireball, FIREBALL_COLOR);
}

// работа с данными

for (var i = 0; i < NUMBER_OF_WIZARD; i++) {
  wizardList.push(generateWizard());
}

// работа с DOM
// create similar characters

userDialog.classList.remove('hidden');
similarCharacterBlock.classList.remove('hidden');
charactersListElement.appendChild(makeFragment(similarWizardTemplate, wizardList, PROPERTIES));


// open and close setup dialog

blockSetupOpen.addEventListener('click', openSetupClickHandler);

blockSetupOpenIcon.addEventListener('keydown', OpenSetupKeydownEnterHandler);

closeButtonBlockSetup.addEventListener('click', closeSetupClickHandler);

closeButtonBlockSetup.addEventListener('keydown', closeSetupKeydownEnterHandler);

// change property of the character

setupWizardCoat.addEventListener('click', wizardCoatClickHandler);

setupWizardEyes.addEventListener('click', wizardEyesClickHandler);

setupWizardFireball.addEventListener('click', wizardFireballClickHandler);
