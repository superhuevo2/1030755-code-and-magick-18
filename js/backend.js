'use strict';
(function () {

  function load(onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      try {
        onLoad(xhr.response);
      } catch (err) {
        onError(xhr.status);
      }

    });
    xhr.addEventListener('error', function () {
      onError(xhr.status);
    });
    xhr.open('GET', 'https://js.dump.academy/code-and-magick/data');
    xhr.send();
  }

  function save(data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    var URL = 'https://js.dump.academy/code-and-magick';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad();
      } else {
        onError(xhr.status);
      }
    });
    xhr.addEventListener('error', onError);
    xhr.open('POST', URL);
    xhr.send(data);
  }


  window.backend = {
    load: load,
    save: save
  };
})();
