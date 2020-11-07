'use strict';

const MAX_VALUE = 100;
const MAX_WIDTH = 450;
const ONE_THIRD = 33.3;
const HALF = 50;
const NEXT_VALUE = 1;

const EFFECTS_LIST = window.form.IMG_UPLOAD_OVERLAY.querySelector(`.effects__list`);
const EFFECT_LEVEL = window.form.IMG_UPLOAD_OVERLAY.querySelector(`.effect-level`);
const EFFECT_LEVEL_VALUE = EFFECT_LEVEL.querySelector(`.effect-level__value`);
const EFFECTS_PREVIEWS = EFFECTS_LIST.querySelectorAll(`.effects__preview`);
const EFFECT_LEVEL_PIN = EFFECT_LEVEL.querySelector(`.effect-level__pin`);
const EFFECT_LEVEL_DEPTH = EFFECT_LEVEL.querySelector(`.effect-level__depth`);

function applyEffect(effect) {
  window.scale.IMG_UPLOAD_PREVIEW.className = `img-upload__preview ${effect}`;
}

function selectEffect(evt) {
  switch (evt.target.value) {
    case `chrome`:
      applyEffect(`effects__preview--chrome`);
      EFFECT_LEVEL.style.display = `block`;
      break;
    case `sepia`:
      applyEffect(`effects__preview--sepia`);
      EFFECT_LEVEL.style.display = `block`;
      break;
    case `marvin`:
      applyEffect(`effects__preview--marvin`);
      EFFECT_LEVEL.style.display = `block`;
      break;
    case `phobos`:
      applyEffect(`effects__preview--phobos`);
      EFFECT_LEVEL.style.display = `block`;
      break;
    case `heat`:
      applyEffect(`effects__preview--heat`);
      EFFECT_LEVEL.style.display = `block`;
      break;
    default:
      applyEffect(`effects__preview--none`);
      EFFECT_LEVEL.style.display = `none`;
      break;
  }
}

function setDefaultValue() {
  EFFECT_LEVEL_DEPTH.style.width = `${MAX_VALUE}%`;
  EFFECT_LEVEL_PIN.style.left = `${MAX_VALUE}%`;
  EFFECT_LEVEL_VALUE.setAttribute(`value`, MAX_VALUE);
}

EFFECTS_LIST.addEventListener(`change`, (evt) => {
  selectEffect(evt);
  window.scale.IMG_UPLOAD_PREVIEW.removeAttribute(`style`);
  window.scale.SCALE_VALUE.value = `${MAX_VALUE}%`;
  setDefaultValue();
});

function setIntensityEffect(value) {
  switch (window.scale.IMG_UPLOAD_PREVIEW.className) {
    case `img-upload__preview effects__preview--chrome`:
      window.scale.IMG_UPLOAD_PREVIEW.style = `filter: grayscale(${value / MAX_VALUE})`;
      break;
    case `img-upload__preview effects__preview--sepia`:
      window.scale.IMG_UPLOAD_PREVIEW.style = `filter: sepia(${value / MAX_VALUE})`;
      break;
    case `img-upload__preview effects__preview--marvin`:
      window.scale.IMG_UPLOAD_PREVIEW.style = `filter: invert(${value}%)`;
      break;
    case `img-upload__preview effects__preview--phobos`:
      window.scale.IMG_UPLOAD_PREVIEW.style = `filter: blur(${value / ONE_THIRD}px)`;
      break;
    case `img-upload__preview effects__preview--heat`:
      window.scale.IMG_UPLOAD_PREVIEW.style = `filter: brightness(${value / HALF + NEXT_VALUE})`;
      break;
  }
}

EFFECT_LEVEL_PIN.addEventListener(`mousedown`, (evt) => {
  evt.preventDefault();
  let startX = evt.clientX;

  function onMouseMove(moveEvt) {
    moveEvt.preventDefault();

    let shift = startX - moveEvt.clientX;

    startX = moveEvt.clientX;

    let positionPin = EFFECT_LEVEL_PIN.offsetLeft - shift;

    EFFECT_LEVEL_PIN.style.left = `${positionPin}px`;
    EFFECT_LEVEL_DEPTH.style.width = `${(positionPin * MAX_VALUE / MAX_WIDTH)}%`;

    if (positionPin >= MAX_WIDTH) {
      EFFECT_LEVEL_PIN.style.left = `${MAX_WIDTH}px`;
      EFFECT_LEVEL_DEPTH.style.width = `${MAX_VALUE}%`;
    }
    if (positionPin <= `0`) {
      EFFECT_LEVEL_PIN.style.left = `0px`;
      EFFECT_LEVEL_DEPTH.style.width = `0%`;
    }
  }

  function onMouseUp(upEvt) {
    upEvt.preventDefault();
    let valueDepth = parseFloat(EFFECT_LEVEL_DEPTH.style.width);

    EFFECT_LEVEL_VALUE.setAttribute(`value`, valueDepth);
    setIntensityEffect(valueDepth);

    window.form.IMG_UPLOAD_OVERLAY.removeEventListener(`mousemove`, onMouseMove);
    window.form.IMG_UPLOAD_OVERLAY.removeEventListener(`mouseup`, onMouseUp);
  }

  window.form.IMG_UPLOAD_OVERLAY.addEventListener(`mousemove`, onMouseMove);
  window.form.IMG_UPLOAD_OVERLAY.addEventListener(`mouseup`, onMouseUp);
});

window.effects = {
  MAX_VALUE,
  applyEffect,
  EFFECT_LEVEL,
  EFFECTS_PREVIEWS
};
