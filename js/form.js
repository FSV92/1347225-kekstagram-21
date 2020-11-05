'use strict';
const DEFAULT_SCALE = `100%`;

let uploadFile = document.querySelector(`#upload-file`);
let imgUploadOverlay = document.querySelector(`.img-upload__overlay`);
let uploadCancel = imgUploadOverlay.querySelector(`#upload-cancel`);
let textDescription = imgUploadOverlay.querySelector(`.text__description`);

function onEditorEscPress(evt) {
  if (evt.key === `Escape` && document.activeElement !== window.hashtags.textHashtags & document.activeElement !== textDescription) {
    evt.preventDefault();
    closeEditor();
  }
}

function closeEditor() {
  imgUploadOverlay.classList.add(`hidden`);
  document.querySelector(`body`).classList.remove(`modal-open`);
  document.removeEventListener(`keydown`, onEditorEscPress);
}

function openEditor() {
  imgUploadOverlay.classList.remove(`hidden`);
  document.querySelector(`body`).classList.add(`modal-open`);
  uploadCancel.addEventListener(`click`, closeEditor);
  document.addEventListener(`keydown`, onEditorEscPress);
  window.effects.applyEffect(`effects__preview--none`);
  window.scale.imgUploadPreview.removeAttribute(`style`);
  window.effects.effectLevel.style.display = `none`;
  window.scale.scaleValue.value = DEFAULT_SCALE;
}

let uploadForm = document.querySelector(`.img-upload__form`);
let main = document.querySelector(`main`);

let templateSuccess = document.querySelector(`#success`).content.querySelector(`.success`);
let successOverlay = templateSuccess.querySelector(`.success__overlay`);
let successButton = templateSuccess.querySelector(`.success__button`);

let templateError = document.querySelector(`#error`).content.querySelector(`.error`);
let errorOverlay = templateError.querySelector(`.error__overlay`);
let errorButton = templateError.querySelector(`.error__button`);

function resetForm() {
  window.effects.applyEffect(`effects__preview--none`);
  window.effects.effectLevel.style.display = `none`;
  window.hashtags.textHashtags.value = ``;
  textDescription.value = ``;
  imgUploadOverlay.classList.add(`hidden`);
  window.scale.scaleValue.value = DEFAULT_SCALE;
}

function successHandler() {
  resetForm();
  main.insertAdjacentElement(`afterbegin`, templateSuccess);
}

function errorHandler() {
  resetForm();
  main.insertAdjacentElement(`afterbegin`, templateError);
}

function cleanEvents() {
  document.removeEventListener(`keydown`, onResultEscPress);
  successButton.removeEventListener(`click`, closeSuccess);
  successOverlay.removeEventListener(`click`, closeSuccess);

  errorButton.removeEventListener(`click`, closeError);
  errorOverlay.removeEventListener(`click`, closeError);
}

function closeSuccess() {
  templateSuccess.remove();
  cleanEvents();
}

function closeError() {
  templateError.remove();
  cleanEvents();
}

function onResultEscPress(evt) {
  evt.preventDefault();
  if (evt.key === `Escape` && main.firstChild.className === `success`) {
    closeSuccess();
  } else {
    closeError();
  }
}

function submitHandler(evt) {
  evt.preventDefault();

  window.backend.sendForm(new FormData(uploadForm), successHandler, errorHandler);

  document.addEventListener(`keydown`, onResultEscPress);
  successButton.addEventListener(`click`, closeSuccess);
  successOverlay.addEventListener(`click`, closeSuccess);
  errorButton.addEventListener(`click`, closeError);
  errorOverlay.addEventListener(`click`, closeError);
  document.removeEventListener(`keydown`, onEditorEscPress);
  uploadFile.value = ``;
}

uploadForm.addEventListener(`submit`, submitHandler);
uploadFile.addEventListener(`change`, openEditor);

window.form = {
  uploadFile,
  imgUploadOverlay,
  openEditor
};
