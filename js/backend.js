'use strict';

(function () {
  const URL_GET = `https://21.javascript.pages.academy/kekstagram/data`;
  let getPictures = function (onSuccess, onError) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError(`Произошла ошибка: ` + xhr.status + ` ` + xhr.text);
      }
    });

    xhr.open(`GET`, URL_GET);
    xhr.send();
  };
  window.backend = {
    getPictures
  };
})();
