'use strict';

const ONE_QUARTER_PERCENT = `25%`;
const HALF_PERCENT = `50%`;
const THREE_QUARTERS_PERCENT = `75%`;
const MAX_VALUE_PERCENT = `100%`;
const ONE_QUARTER_DECIMAL = 0.25;
const HALF_DECIMAL = 0.5;
const THREE_QUARTERS_DECIMAL = 0.75;
const MAX_VALUE_DECIMAL = 1;

const SCALE_SMALLER = window.form.IMG_UPLOAD_OVERLAY.querySelector(`.scale__control--smaller`);
const SCALE_BIGGER = window.form.IMG_UPLOAD_OVERLAY.querySelector(`.scale__control--bigger `);
const SCALE_VALUE = window.form.IMG_UPLOAD_OVERLAY.querySelector(`.scale__control--value`);
const IMG_UPLOAD_PREVIEW = window.form.IMG_UPLOAD_OVERLAY.querySelector(`.img-upload__preview`);

function increaseScale() {
  switch (SCALE_VALUE.value) {
    case ONE_QUARTER_PERCENT:
      IMG_UPLOAD_PREVIEW.style = `transform: scale(${HALF_DECIMAL})`;
      SCALE_VALUE.value = HALF_PERCENT;
      break;
    case HALF_PERCENT:
      IMG_UPLOAD_PREVIEW.style = `transform: scale(${THREE_QUARTERS_DECIMAL})`;
      SCALE_VALUE.value = THREE_QUARTERS_PERCENT;
      break;
    default:
      IMG_UPLOAD_PREVIEW.style = `transform: scale(${MAX_VALUE_DECIMAL})`;
      SCALE_VALUE.value = MAX_VALUE_PERCENT;
      break;
  }
}

function decreaseScale() {
  switch (SCALE_VALUE.value) {
    case MAX_VALUE_PERCENT:
      IMG_UPLOAD_PREVIEW.style = `transform: scale(${THREE_QUARTERS_DECIMAL})`;
      SCALE_VALUE.value = THREE_QUARTERS_PERCENT;
      break;
    case THREE_QUARTERS_PERCENT:
      IMG_UPLOAD_PREVIEW.style = `transform: scale(${HALF_DECIMAL})`;
      SCALE_VALUE.value = HALF_PERCENT;
      break;
    default:
      IMG_UPLOAD_PREVIEW.style = `transform: scale(${ONE_QUARTER_DECIMAL})`;
      SCALE_VALUE.value = ONE_QUARTER_PERCENT;
      break;
  }
}

SCALE_SMALLER.addEventListener(`click`, () => {
  decreaseScale();
});
SCALE_BIGGER.addEventListener(`click`, () => {
  increaseScale();
});

window.scale = {
  IMG_UPLOAD_PREVIEW,
  SCALE_VALUE
};
