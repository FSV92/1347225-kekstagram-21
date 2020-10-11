'use strict';

(function () {
  let effectsList = window.form.imgUploadOverlay.querySelector(`.effects__list`);
  let effectLevelLine = window.form.imgUploadOverlay.querySelector(`.effect-level__line`);
  let effectLevelValue = window.form.imgUploadOverlay.querySelector(`.effect-level__value`);

  let applyEffect = function (effect) {
    window.scale.imgUploadPreview.className = `img-upload__preview ${effect}`;
  };
  let selectEffect = function (evt) {
    switch (evt.target.value) {
      case `chrome`:
        applyEffect(`effects__preview--chrome`);
        break;
      case `sepia`:
        applyEffect(`effects__preview--sepia`);
        break;
      case `marvin`:
        applyEffect(`effects__preview--marvin`);
        break;
      case `phobos`:
        applyEffect(`effects__preview--phobos`);
        break;
      case `heat`:
        applyEffect(`effects__preview--heat`);
        break;
      default:
        applyEffect(`effects__preview--none`);
    }
  };

  effectsList.addEventListener(`change`, function (evt) {
    selectEffect(evt);
    window.scale.imgUploadPreview.removeAttribute(`style`);
  });

  let intensityEffect = function (value) {
    switch (window.scale.imgUploadPreview.className) {
      case `img-upload__preview effects__preview--chrome`:
        window.scale.imgUploadPreview.style = `filter: grayscale(${value / 100})`;
        break;
      case `img-upload__preview effects__preview--sepia`:
        window.scale.imgUploadPreview.style = `filter: sepia(${value / 100})`;
        break;
      case `img-upload__preview effects__preview--marvin`:
        window.scale.imgUploadPreview.style = `filter: invert(${value}%)`;
        break;
      case `img-upload__preview effects__preview--phobos`:
        window.scale.imgUploadPreview.style = `filter: blur(${value / 33.3}px)`;
        break;
      case `img-upload__preview effects__preview--heat`:
        window.scale.imgUploadPreview.style = `filter: brightness(${value / 50 + 1})`;
        break;
    }
  };

  effectLevelLine.addEventListener(`mouseup`, function (evt) {
    let value = effectLevelValue.value;
    value = evt.offsetX * 100 / 450;
    intensityEffect(value);
  });
})();
