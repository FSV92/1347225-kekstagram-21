'use strict';

(function () {
  const URL_GET = `https://21.javascript.pages.academy/kekstagram/data`;
  const URL_POST = `https://21.javascript.pages.academy/kekstagram`;
  const STATUS_OK = 200;

  let getPictures = function (onSuccess, onError) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      if (xhr.status === STATUS_OK) {
        onSuccess(xhr.response);
      } else {
        onError(`Произошла ошибка получения: ` + xhr.status + ` ` + xhr.text);
      }
    });

    xhr.open(`GET`, URL_GET);
    xhr.send();
  };

  let sendForm = function (data, onSuccess, onError) {
    let xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      if (xhr.status === STATUS_OK) {
        onSuccess();
      } else {
        onError();
      }
    });

    xhr.open(`POST`, URL_POST);
    xhr.send(data);
  };

  window.backend = {
    getPictures,
    sendForm,
  };
})();
