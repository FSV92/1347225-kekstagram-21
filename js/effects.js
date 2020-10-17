'use strict';

(function () {
  let effectsList = window.form.imgUploadOverlay.querySelector(`.effects__list`);
  let effectLevel = window.form.imgUploadOverlay.querySelector(`.effect-level`);
  let effectLevelValue = effectLevel.querySelector(`.effect-level__value`);

  let applyEffect = function (effect) {
    window.scale.imgUploadPreview.className = `img-upload__preview ${effect}`;
  };
  let selectEffect = function (evt) {
    switch (evt.target.value) {
      case `chrome`:
        applyEffect(`effects__preview--chrome`);
        effectLevel.style.display = `block`;
        break;
      case `sepia`:
        applyEffect(`effects__preview--sepia`);
        effectLevel.style.display = `block`;
        break;
      case `marvin`:
        applyEffect(`effects__preview--marvin`);
        effectLevel.style.display = `block`;
        break;
      case `phobos`:
        applyEffect(`effects__preview--phobos`);
        effectLevel.style.display = `block`;
        break;
      case `heat`:
        applyEffect(`effects__preview--heat`);
        effectLevel.style.display = `block`;
        break;
      default:
        applyEffect(`effects__preview--none`);
        effectLevel.style.display = `none`;
    }
  };

  let defaultValue = function () {
    effectLevelDepth.style.width = `100%`;
    effectLevelPin.style.left = `100%`;
    effectLevelValue.setAttribute(`value`, 100);
  };

  effectsList.addEventListener(`change`, function (evt) {
    selectEffect(evt);
    window.scale.imgUploadPreview.removeAttribute(`style`);
    window.scale.scaleValue.value = `100%`;
    defaultValue();
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

  let effectLevelPin = effectLevel.querySelector(`.effect-level__pin`);
  let effectLevelDepth = effectLevel.querySelector(`.effect-level__depth`);

  defaultValue();

  effectLevelPin.addEventListener(`mousedown`, function (evt) {
    evt.preventDefault();
    let startX = evt.clientX;

    let onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      let shift = startX - moveEvt.clientX;

      startX = moveEvt.clientX;

      let positionPin = effectLevelPin.offsetLeft - shift;

      effectLevelPin.style.left = positionPin + `px`;
      effectLevelDepth.style.width = (positionPin * 100 / 450) + `%`;

      if (positionPin >= `450`) {
        effectLevelPin.style.left = `450px`;
        effectLevelDepth.style.width = `100%`;
      }
      if (positionPin <= `0`) {
        effectLevelPin.style.left = `0px`;
        effectLevelDepth.style.width = `0%`;
      }

    };

    let onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      let valueDepth = parseFloat(effectLevelDepth.style.width);

      effectLevelValue.setAttribute(`value`, valueDepth);
      intensityEffect(valueDepth);

      window.form.imgUploadOverlay.removeEventListener(`mousemove`, onMouseMove);
      window.form.imgUploadOverlay.removeEventListener(`mouseup`, onMouseUp);
    };

    window.form.imgUploadOverlay.addEventListener(`mousemove`, onMouseMove);
    window.form.imgUploadOverlay.addEventListener(`mouseup`, onMouseUp);
  });

  window.effects = {
    applyEffect,
    effectLevel


  };
})();
