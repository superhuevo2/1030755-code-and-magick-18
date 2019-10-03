'use strict';
(function () {
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

  var NUMBER_OF_WIZARD = 4;

  window.setup = {
    COAT_COLORS: COAT_COLORS,
    EYE_COLORS: EYE_COLORS
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
   * @param {object} wizard
   * @return {object} DOM's element 'wizard'.
   */

  function renderWizard(wizard) {
    var template = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');
    var element = template.cloneNode(true);

    element.querySelector('.setup-similar-label').textContent = wizard.name;
    element.querySelector('.wizard-coat').setAttribute('fill', wizard.coatColors);
    element.querySelector('.wizard-eyes').setAttribute('fill', wizard.eyesColors);

    return element;
  }

  // работа с DOM

  var setup = document.querySelector('.setup');
  var charactersList = setup.querySelector('.setup-similar-list');
  var similarCharacterBlock = setup.querySelector('.setup-similar');

  // create similar characters
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < NUMBER_OF_WIZARD; i++) {
    fragment.appendChild(renderWizard(generateWizard()));
  }

  charactersList.appendChild(fragment);
  similarCharacterBlock.classList.remove('hidden');
})();

