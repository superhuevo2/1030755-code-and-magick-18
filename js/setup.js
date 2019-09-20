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

var PROPERTIES = {
  '.setup-similar-label': 'name',
  '.wizard-coat': 'coatColors',
  '.wizard-eyes': 'eyesColors'
};


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
        element.querySelector(p).textContent = data[i][properties[p]]; // почему тут не работает через точку data[i].properties[p] ?
      } else {
        element.querySelector(p).setAttribute('fill', data[i][properties[p]]);
      }
    }
    fragment.appendChild(element);
  }
  return fragment;
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

charactersListElement.appendChild(makeFragment(similarWizardTemplate, wizardList, PROPERTIES));

similarCharacterBlock.classList.remove('hidden');
