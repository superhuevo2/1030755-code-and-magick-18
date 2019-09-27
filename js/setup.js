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
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

var PROPERTIES = {
  '.setup-similar-label': 'name',
  '.wizard-coat': 'coatColors',
  '.wizard-eyes': 'eyesColors'
};

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
var saveButtonBlockSetup = blockSetup.querySelector('.setup-submit');
var setupForm = blockSetup.querySelector('.setup-wizard-form');
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
};

/**
 * close the popup
 */
function closePopup() {
  blockSetup.classList.add('hidden');
  document.removeEventListener('keydown', popupKeydownEscHandler);
}

function setWizardFeature(featureName, listOfFeatures) {
  var newColor = chooseRandom(listOfFeatures);
  while (featureName === newColor) {
    newColor = chooseRandom(newColor);
  }
  featureName.setAttribute('style', 'fill: ' + newColor);
}

function setWizardFireball() {
  var newColor = chooseRandom(FIREBALL_COLOR);
  while (setupWizardFireball === newColor) {
    newColor = chooseRandom(newColor);
  }
  setupWizardFireball.setAttribute('style', 'background-color: ' + newColor);
}

// работа с данными

for (var i = 0; i < 4; i++) {
  wizardList.push(generateWizard());
}

// работа с DOM
// create similar characters

userDialog.classList.remove('hidden');
similarCharacterBlock.classList.remove('hidden');
charactersListElement.appendChild(makeFragment(similarWizardTemplate, wizardList, PROPERTIES));
similarCharacterBlock.classList.remove('hidden');

//open and close setup dialog

blockSetupOpen.addEventListener('click', function openSetupClickHandler() {
  openPopup();
})

blockSetupOpenIcon.addEventListener('keydown', function OpenSetupKeydownEnterHandler(evt) {
  if (evt.keyCode == KEY_ENTER) {
    openPopup();
  }
})

closeButtonBlockSetup.addEventListener('click', function closeSetupClickHandler() {
  closePopup();
})

closeButtonBlockSetup.addEventListener('keydown', function closeSetupKeydownEnterHandler(evt) {
  if (evt.keyCode === KEY_ENTER) {
    closePopup();
  }
});

//change property of the character

setupWizardCoat.addEventListener('click', function wizardCoatClickHandler() {
  setWizardFeature(setupWizardCoat, COAT_COLORS);
});

setupWizardEyes.addEventListener('click', function wizardEyesClickHandler() {
  setWizardFeature(setupWizardEyes, EYE_COLORS);
});

setupWizardFireball.addEventListener('click', function wizardCoatClickHandler() {
  setWizardFireball();
});
