'use strict';

let scaleSmaller = window.form.imgUploadOverlay.querySelector(`.scale__control--smaller`);
let scaleBigger = window.form.imgUploadOverlay.querySelector(`.scale__control--bigger `);
let scaleValue = window.form.imgUploadOverlay.querySelector(`.scale__control--value`);
let imgUploadPreview = window.form.imgUploadOverlay.querySelector(`.img-upload__preview`);

let increaseScale = function () {
  switch (scaleValue.value) {
    case `25%`:
      imgUploadPreview.style = `transform: scale(0.5)`;
      scaleValue.value = `50%`;
      break;
    case `50%`:
      imgUploadPreview.style = `transform: scale(0.75)`;
      scaleValue.value = `75%`;
      break;
    default:
      imgUploadPreview.style = `transform: scale(1)`;
      scaleValue.value = `100%`;
      break;
  }
};

let decreaseScale = function () {
  switch (scaleValue.value) {
    case `100%`:
      imgUploadPreview.style = `transform: scale(0.75)`;
      scaleValue.value = `75%`;
      break;
    case `75%`:
      imgUploadPreview.style = `transform: scale(0.5)`;
      scaleValue.value = `50%`;
      break;
    default:
      imgUploadPreview.style = `transform: scale(0.25)`;
      scaleValue.value = `25%`;
      break;
  }
};

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
