'use strict';

(function () {
  let scaleSmaller = window.form.imgUploadOverlay.querySelector(`.scale__control--smaller`);
  let scaleBigger = window.form.imgUploadOverlay.querySelector(`.scale__control--bigger `);
  let scaleValue = window.form.imgUploadOverlay.querySelector(`.scale__control--value`);
  let imgUploadPreview = window.form.imgUploadOverlay.querySelector(`.img-upload__preview`);

  let increase = function () {
    if (scaleValue.value === `25%`) {
      imgUploadPreview.style = `transform: scale(0.5)`;
      scaleValue.value = `50%`;
    } else if (scaleValue.value === `50%`) {
      imgUploadPreview.style = `transform: scale(0.75)`;
      scaleValue.value = `75%`;
    } else {
      imgUploadPreview.style = `transform: scale(1)`;
      scaleValue.value = `100%`;
    }
  };

  let decrease = function () {
    if (scaleValue.value === `100%`) {
      imgUploadPreview.style = `transform: scale(0.75)`;
      scaleValue.value = `75%`;
    } else if (scaleValue.value === `75%`) {
      imgUploadPreview.style = `transform: scale(0.5)`;
      scaleValue.value = `50%`;
    } else {
      imgUploadPreview.style = `transform: scale(0.25)`;
      scaleValue.value = `25%`;
    }
  };

  scaleSmaller.addEventListener(`click`, function () {
    decrease();
  });
  scaleBigger.addEventListener(`click`, function () {
    increase();
  });

  window.scale = {
    imgUploadPreview
  };
}());
