'use strict';
(function () {
  var COAT_COLOR = [
    'rgb(101, 137, 164)',
    'rgb(241, 43, 107)',
    'rgb(146, 100, 161)',
    'rgb(56, 159, 117)',
    'rgb(215, 210, 55)',
    'rgb(0, 0, 0)'
  ];
  var EYE_COLOR = [
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

  var NEXT_COLOR_INDEX = 1;

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
   * change a color of an element
   * @param {object} element
   * @param {array} colorList
   */
  function getNextColor(element, colorList) {
    var currentColor = element.style.backgroundColor || element.style.fill;
    var currentIndex;
    var nextIndex;
    var nextColor;
    if (currentColor === '') {
      nextColor = colorList[NEXT_COLOR_INDEX];
    } else {
      currentIndex = colorList.indexOf(currentColor);
      nextIndex = changeIndex(currentIndex, colorList);
      nextColor = colorList[nextIndex];
    }

    if (element.tagName.toLowerCase() === 'div') {
      element.style.backgroundColor = nextColor;
    } else {
      element.setAttribute('style', 'fill: ' + nextColor);
    }
  }


  window.colorize = {
    COAT_COLOR: COAT_COLOR,
    EYE_COLOR: EYE_COLOR,
    FIREBALL_COLOR: FIREBALL_COLOR,
    getNextColor: getNextColor
  };
})();
