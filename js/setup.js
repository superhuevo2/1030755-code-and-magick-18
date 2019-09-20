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
 * @param {array} firstNames array of first names for generating wizard's name.
 * @param {array} lastNames array of last names for generating wizard's name.
 * @param {array} coatColors array of colors for generating wizard's coat.
 * @param {array} eyesColors array of colors for generating wizard's eyes.
 * @return {object} an object that contains wizard's name and colors of eyes and coat.
 */
function generateWizard(firstNames, lastNames, coatColors, eyesColors) {
  var wizard = {};

  wizard.name = chooseRandom(firstNames) + ' ' + chooseRandom(lastNames);
  wizard.coatColors = chooseRandom(coatColors);
  wizard.eyesColors = chooseRandom(eyesColors);

  return wizard;
}

// работа с данными

var wizardList = [];

for (var i = 0; i < 4; i++) {
  wizardList.push(generateWizard(FIRST_NAMES, LAST_NAMES, COAT_COLORS, EYE_COLORS));
}

// работа с DOM

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var charactersListElement = userDialog.querySelector('.setup-similar-list');
var similarCharacterBlock = userDialog.querySelector('.setup-similar');
similarCharacterBlock.classList.remove('hidden');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');
var fragment = document.createDocumentFragment();

for (var n = 0; n < wizardList.length; n++) {
  var element = similarWizardTemplate.cloneNode(true);

  element.querySelector('.setup-similar-label').textContent = wizardList[n].name;
  element.querySelector('.wizard-coat').setAttribute('fill', wizardList[n].coatColors);
  element.querySelector('.wizard-eyes').setAttribute('fill', wizardList[n].eyesColors);

  fragment.appendChild(element);
}

charactersListElement.appendChild(fragment);
similarCharacterBlock.classList.remove('hidden');
