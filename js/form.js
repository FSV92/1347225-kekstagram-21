"use strict";

(function () {
  let uploadFile = document.querySelector(`#upload-file`);
  let imgUploadOverlay = document.querySelector(`.img-upload__overlay`);
  let uploadCancel = imgUploadOverlay.querySelector(`#upload-cancel`);

  let onEditorEscPress = function (evt) {
    if (evt.key === `Escape` && window.hastags.textHashtags !== document.activeElement) {
      evt.preventDefault();
      closeEditor();
    }
  };

  let closeEditor = function () {
    imgUploadOverlay.classList.add(`hidden`);
    document.querySelector(`body`).classList.remove(`modal-open`);
    document.removeEventListener(`keydown`, onEditorEscPress);
  };

  let onUploadChange = function () {
    uploadFile.addEventListener(`change`, function () {
      imgUploadOverlay.classList.remove(`hidden`);
      document.querySelector(`body`).classList.add(`modal-open`);
      uploadCancel.addEventListener(`click`, closeEditor);
      document.addEventListener(`keydown`, onEditorEscPress);
    });
  };

  window.form = {
    imgUploadOverlay,
    onUploadChange
  };
}());
