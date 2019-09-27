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

var KEY_ENTER = 13;
var KEY_ESCAPE = 27


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
        element.querySelector(p).textContent = data[i][properties[p]]; // почему тут не работает через точку data[i].properties[p] ?
      } else {
        element.querySelector(p).setAttribute('fill', data[i][properties[p]]);
      }
    }
    fragment.appendChild(element);
  }
  return fragment;
}

/**
 * remove class 'hidden' of object
 * @param {object} block
 */
function openBlock(block) {
  block.classList.remove('hidden');
}

/**
 * add class 'hidden' to object
 * @param {object} block
 */
function closeBlock(block) {
  block.classList.add('hidden');
}

/**
 * checks if block is open now
 * @param {Object} block
 * @return {Boolean}
 */
function isBlockOpen(block) {
  return !block.classList.contains('hidden')
}

// работа с данными

var wizardList = [];

for (var i = 0; i < 4; i++) {
  wizardList.push(generateWizard());
}

// работа с DOM
// create similar characters
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

//open and close setup dialog
var blockSetup = document.querySelector('.setup');
var closeButtonBlockSetup = blockSetup.querySelector('.setup-close');
var userNameBlockSetup = blockSetup.querySelector('.setup-user-name');
var blockSetupOpen = document.querySelector('.setup-open');
var blockSetupOpenIcon = document.querySelector('.setup-open-icon');
var saveButtonBlockSetup = blockSetup.querySelector('.setup-submit');
var setupForm = blockSetup.querySelector('.setup-wizard-form')

blockSetupOpen.addEventListener('click', function openSetupClickHandler(evt) {
  openBlock(blockSetup);
})

blockSetupOpenIcon.addEventListener('keydown', function OpenSetupKeydownEnterHandler(evt) {
  if (evt.keyCode == KEY_ENTER) {
    openBlock(blockSetup);
  }
})

closeButtonBlockSetup.addEventListener('click', function closeSetupClickHandler(evt) {
  closeBlock(blockSetup);
})

document.addEventListener('keydown', function closeSetupKeydownEscHandler(evt) {
  if (isBlockOpen(blockSetup) && document.activeElement !== userNameBlockSetup && evt.keyCode === KEY_ESCAPE) {
    closeBlock(blockSetup);
  }
})

closeButtonBlockSetup.addEventListener('keydown', function closeSetupKeydownEnterHandler(evt) {
  if (evt.keyCode === KEY_ENTER) {
    closeBlock(blockSetup);
  }
})

