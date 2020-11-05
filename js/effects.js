'use strict';

const MAX_VALUE = 100;
const MAX_WIDTH = 450;
const ONE_THIRD = 33.3;
const HALF = 50;
const NEXT_VALUE = 1;

let effectsList = window.form.imgUploadOverlay.querySelector(`.effects__list`);
let effectLevel = window.form.imgUploadOverlay.querySelector(`.effect-level`);
let effectLevelValue = effectLevel.querySelector(`.effect-level__value`);
let effectsPreview = effectsList.querySelectorAll(`.effects__preview`);

function applyEffect(effect) {
  window.scale.imgUploadPreview.className = `img-upload__preview ${effect}`;
}

function selectEffect(evt) {
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
      break;
  }
}

function setDefaultValue() {
  effectLevelDepth.style.width = MAX_VALUE + `%`;
  effectLevelPin.style.left = MAX_VALUE + `%`;
  effectLevelValue.setAttribute(`value`, MAX_VALUE);
}

effectsList.addEventListener(`change`, function (evt) {
  selectEffect(evt);
  window.scale.imgUploadPreview.removeAttribute(`style`);
  window.scale.scaleValue.value = MAX_VALUE + `%`;
  setDefaultValue();
});

function setIntensityEffect(value) {
  switch (window.scale.imgUploadPreview.className) {
    case `img-upload__preview effects__preview--chrome`:
      window.scale.imgUploadPreview.style = `filter: grayscale(${value / MAX_VALUE})`;
      break;
    case `img-upload__preview effects__preview--sepia`:
      window.scale.imgUploadPreview.style = `filter: sepia(${value / MAX_VALUE})`;
      break;
    case `img-upload__preview effects__preview--marvin`:
      window.scale.imgUploadPreview.style = `filter: invert(${value}%)`;
      break;
    case `img-upload__preview effects__preview--phobos`:
      window.scale.imgUploadPreview.style = `filter: blur(${value / ONE_THIRD}px)`;
      break;
    case `img-upload__preview effects__preview--heat`:
      window.scale.imgUploadPreview.style = `filter: brightness(${value / HALF + NEXT_VALUE})`;
      break;
  }
}

let effectLevelPin = effectLevel.querySelector(`.effect-level__pin`);
let effectLevelDepth = effectLevel.querySelector(`.effect-level__depth`);

effectLevelPin.addEventListener(`mousedown`, function (evt) {
  evt.preventDefault();
  let startX = evt.clientX;

  function onMouseMove(moveEvt) {
    moveEvt.preventDefault();

    let shift = startX - moveEvt.clientX;

    startX = moveEvt.clientX;

    let positionPin = effectLevelPin.offsetLeft - shift;

    effectLevelPin.style.left = positionPin + `px`;
    effectLevelDepth.style.width = (positionPin * MAX_VALUE / MAX_WIDTH) + `%`;

    if (positionPin >= MAX_WIDTH) {
      effectLevelPin.style.left = MAX_WIDTH + `px`;
      effectLevelDepth.style.width = MAX_VALUE + `%`;
    }
    if (positionPin <= `0`) {
      effectLevelPin.style.left = `0px`;
      effectLevelDepth.style.width = `0%`;
    }
  }

  function onMouseUp(upEvt) {
    upEvt.preventDefault();
    let valueDepth = parseFloat(effectLevelDepth.style.width);

    effectLevelValue.setAttribute(`value`, valueDepth);
    setIntensityEffect(valueDepth);

    window.form.imgUploadOverlay.removeEventListener(`mousemove`, onMouseMove);
    window.form.imgUploadOverlay.removeEventListener(`mouseup`, onMouseUp);
  }

  window.form.imgUploadOverlay.addEventListener(`mousemove`, onMouseMove);
  window.form.imgUploadOverlay.addEventListener(`mouseup`, onMouseUp);
});

window.effects = {
  MAX_VALUE,
  applyEffect,
  effectLevel,
  effectsPreview
};
