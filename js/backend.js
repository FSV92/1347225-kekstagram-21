'use strict';

const URL_GET = `https://21.javascript.pages.academy/kekstagram/data`;
const URL_POST = `https://21.javascript.pages.academy/kekstagram`;
const STATUS_OK = 200;

function request(method, url, onSuccess, onError, data = null) {
  let xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, function () {
    if (xhr.status === STATUS_OK) {
      onSuccess(xhr.response);
    } else {
      onError(`Произошла ошибка получения: ` + xhr.status + ` ` + xhr.text);
    }
  });
  xhr.open(method, url);
  xhr.send(data);
}

function getPictures(onSuccess, onError) {
  request(`GET`, URL_GET, onSuccess, onError);
}

function sendForm(data, onSuccess, onError) {
  request(`POST`, URL_POST, onSuccess, onError, data);
}


window.backend = {
  getPictures,
  sendForm
};
