'use strict';
const DEFAULT_SCALE = `100%`;

const UPLOAD_FILE = document.querySelector(`#upload-file`);
const IMG_UPLOAD_OVERLAY = document.querySelector(`.img-upload__overlay`);
const UPLOAD_CANCEL = IMG_UPLOAD_OVERLAY.querySelector(`#upload-cancel`);
const TEXT_DESCRIPTION = IMG_UPLOAD_OVERLAY.querySelector(`.text__description`);
const UPLOAD_FORM = document.querySelector(`.img-upload__form`);
const MAIN = document.querySelector(`main`);

const TEMPLATE_SUCCESS = document.querySelector(`#success`).content.querySelector(`.success`);
const SUCCESS_OVERLAY = TEMPLATE_SUCCESS.querySelector(`.success__overlay`);
const SUCCESS_BUTTON = TEMPLATE_SUCCESS.querySelector(`.success__button`);

const TEMPLATE_ERROR = document.querySelector(`#error`).content.querySelector(`.error`);
const ERROR_OVERLAY = TEMPLATE_ERROR.querySelector(`.error__overlay`);
const ERROR_BUTTON = TEMPLATE_ERROR.querySelector(`.error__button`);

function onEditorEscPress(evt) {
  if (evt.key === `Escape` && document.activeElement !== window.hashtags.TEXT_HASHTAGS & document.activeElement !== TEXT_DESCRIPTION) {
    evt.preventDefault();
    closeEditor();
  }
}

function closeEditor() {
  IMG_UPLOAD_OVERLAY.classList.add(`hidden`);
  document.querySelector(`body`).classList.remove(`modal-open`);
  document.removeEventListener(`keydown`, onEditorEscPress);
  window.form.UPLOAD_FILE.value = ``;
}

function openEditor() {
  IMG_UPLOAD_OVERLAY.classList.remove(`hidden`);
  document.querySelector(`body`).classList.add(`modal-open`);
  UPLOAD_CANCEL.addEventListener(`click`, closeEditor);
  document.addEventListener(`keydown`, onEditorEscPress);
  window.effects.applyEffect(`effects__preview--none`);
  window.scale.IMG_UPLOAD_PREVIEW.removeAttribute(`style`);
  window.effects.EFFECT_LEVEL.style.display = `none`;
  window.scale.SCALE_VALUE.value = DEFAULT_SCALE;
}

function resetForm() {
  window.effects.applyEffect(`effects__preview--none`);
  window.effects.EFFECT_LEVEL.style.display = `none`;
  window.hashtags.TEXT_HASHTAGS.value = ``;
  TEXT_DESCRIPTION.value = ``;
  IMG_UPLOAD_OVERLAY.classList.add(`hidden`);
  window.scale.SCALE_VALUE.value = DEFAULT_SCALE;
}

function successHandler() {
  resetForm();
  MAIN.insertAdjacentElement(`afterbegin`, TEMPLATE_SUCCESS);
}

function errorHandler() {
  resetForm();
  MAIN.insertAdjacentElement(`afterbegin`, TEMPLATE_ERROR);
}

function cleanEvents() {
  document.removeEventListener(`keydown`, onResultEscPress);
  SUCCESS_BUTTON.removeEventListener(`click`, onSuccessClose);
  SUCCESS_OVERLAY.removeEventListener(`click`, onSuccessClose);

  ERROR_BUTTON.removeEventListener(`click`, onErrorClose);
  ERROR_OVERLAY.removeEventListener(`click`, onErrorClose);
}

function onSuccessClose() {
  TEMPLATE_SUCCESS.remove();
  cleanEvents();
}

function onErrorClose() {
  TEMPLATE_ERROR.remove();
  cleanEvents();
}

function onResultEscPress(evt) {
  evt.preventDefault();
  if (evt.key === `Escape` && MAIN.firstChild.className === `success`) {
    onSuccessClose();
  } else {
    onErrorClose();
  }
}

function onFormSubmit(evt) {
  evt.preventDefault();

  window.backend.sendForm(new FormData(UPLOAD_FORM), successHandler, errorHandler);

  document.addEventListener(`keydown`, onResultEscPress);
  SUCCESS_BUTTON.addEventListener(`click`, onSuccessClose);
  SUCCESS_OVERLAY.addEventListener(`click`, onSuccessClose);
  ERROR_BUTTON.addEventListener(`click`, onErrorClose);
  ERROR_OVERLAY.addEventListener(`click`, onErrorClose);
  document.removeEventListener(`keydown`, onEditorEscPress);
  UPLOAD_FILE.value = ``;
}

UPLOAD_FORM.addEventListener(`submit`, onFormSubmit);
UPLOAD_FILE.addEventListener(`change`, openEditor);

window.form = {
  UPLOAD_FILE,
  IMG_UPLOAD_OVERLAY,
  openEditor
};
