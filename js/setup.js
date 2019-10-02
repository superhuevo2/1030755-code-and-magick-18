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
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
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

// работа с данными

var wizardList = [];
for (var i = 0; i < NUMBER_OF_WIZARD; i++) {
  wizardList.push(generateWizard());
}

// работа с DOM

var setup = document.querySelector('.setup');
var charactersListElement = setup.querySelector('.setup-similar-list');
var similarCharacterBlock = setup.querySelector('.setup-similar');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

// create similar characters

setup.classList.remove('hidden');
similarCharacterBlock.classList.remove('hidden');
charactersListElement.appendChild(makeFragment(similarWizardTemplate, wizardList, PROPERTIES));
