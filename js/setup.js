'use strict';
(function () {
  var load = window.backend.load;
  var createErrorPopup = window.dialog.createErrorPopup;
  var NUMBER_OF_WIZARD = 4;

  // описание функций


  /**
   * made a set of DOM's object from the data and from template
   * @param {object} wizard
   * @return {object} DOM's element 'wizard'.
   */

  function createWizard(wizard) {
    var element = wizardTemplate.cloneNode(true);

    element.querySelector('.setup-similar-label').textContent = wizard.name;
    element.querySelector('.wizard-coat').setAttribute('fill', wizard.colorCoat);
    element.querySelector('.wizard-eyes').setAttribute('fill', wizard.colorEyes);

    return element;
  }

  function renderWizards(wizardList) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < NUMBER_OF_WIZARD; i++) {
      fragment.appendChild(createWizard(wizardList[i]));
    }

    charactersList.appendChild(fragment);
    similarCharacterBlock.classList.remove('hidden');
  }

  // работа с DOM

  var setup = document.querySelector('.setup');
  var charactersList = setup.querySelector('.setup-similar-list');
  var similarCharacterBlock = setup.querySelector('.setup-similar');
  var wizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');

  // create similar characters
  load(renderWizards, createErrorPopup);
})();

