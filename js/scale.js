'use strict';

const ONE_QUARTER_PERCENT = `25%`;
const HALF_PERCENT = `50%`;
const THREE_QUARTERS_PERCENT = `75%`;
const MAX_VALUE_PERCENT = `100%`;
const ONE_QUARTER_DECIMAL = 0.25;
const HALF_DECIMAL = 0.5;
const THREE_QUARTERS_DECIMAL = 0.75;
const MAX_VALUE_DECIMAL = 1;

let scaleSmaller = window.form.imgUploadOverlay.querySelector(`.scale__control--smaller`);
let scaleBigger = window.form.imgUploadOverlay.querySelector(`.scale__control--bigger `);
let scaleValue = window.form.imgUploadOverlay.querySelector(`.scale__control--value`);
let imgUploadPreview = window.form.imgUploadOverlay.querySelector(`.img-upload__preview`);

function increaseScale() {
  switch (scaleValue.value) {
    case ONE_QUARTER_PERCENT:
      imgUploadPreview.style = `transform: scale(${HALF_DECIMAL})`;
      scaleValue.value = HALF_PERCENT;
      break;
    case HALF_PERCENT:
      imgUploadPreview.style = `transform: scale(${THREE_QUARTERS_DECIMAL})`;
      scaleValue.value = THREE_QUARTERS_PERCENT;
      break;
    default:
      imgUploadPreview.style = `transform: scale(${MAX_VALUE_DECIMAL})`;
      scaleValue.value = MAX_VALUE_PERCENT;
      break;
  }
}

function decreaseScale() {
  switch (scaleValue.value) {
    case MAX_VALUE_PERCENT:
      imgUploadPreview.style = `transform: scale(${THREE_QUARTERS_DECIMAL})`;
      scaleValue.value = THREE_QUARTERS_PERCENT;
      break;
    case THREE_QUARTERS_PERCENT:
      imgUploadPreview.style = `transform: scale(${HALF_DECIMAL})`;
      scaleValue.value = HALF_PERCENT;
      break;
    default:
      imgUploadPreview.style = `transform: scale(${ONE_QUARTER_DECIMAL})`;
      scaleValue.value = ONE_QUARTER_PERCENT;
      break;
  }
}

scaleSmaller.addEventListener(`click`, function () {
  decreaseScale();
});
scaleBigger.addEventListener(`click`, function () {
  increaseScale();
});

window.scale = {
  imgUploadPreview,
  scaleValue
};
