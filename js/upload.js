"use strict";

// Открытие/закрытие окна редактора
let uploadFile = document.querySelector(`#upload-file`);
let imgUploadOverlay = document.querySelector(`.img-upload__overlay`);
let uploadCancel = imgUploadOverlay.querySelector(`#upload-cancel`);

let onEditorEscPress = function (evt) {
  if (evt.key === `Escape` && textHashtags !== document.activeElement) {
    evt.preventDefault();
    closeEditor();
  }
};

let closeEditor = function () {
  imgUploadOverlay.classList.add(`hidden`);
  document.querySelector(`body`).classList.remove(`modal-open`);
  document.removeEventListener(`keydown`, onEditorEscPress);
};

uploadCancel.addEventListener(`click`, function () {
  closeEditor();
});

uploadFile.addEventListener(`change`, function () {
  imgUploadOverlay.classList.remove(`hidden`);
  document.querySelector(`body`).classList.add(`modal-open`);
  document.addEventListener(`keydown`, onEditorEscPress);
});

// Масштабирование фотографии
let scaleSmaller = imgUploadOverlay.querySelector(`.scale__control--smaller`);
let scaleBigger = imgUploadOverlay.querySelector(`.scale__control--bigger `);
let scaleValue = imgUploadOverlay.querySelector(`.scale__control--value`);
let imgUploadPreview = imgUploadOverlay.querySelector(`.img-upload__preview`);

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

// Эффекты для фотографий
let effectsList = imgUploadOverlay.querySelector(`.effects__list`);
let effectLevelLine = imgUploadOverlay.querySelector(`.effect-level__line`);
let effectLevelValue = imgUploadOverlay.querySelector(`.effect-level__value`);

let applyEffect = function (effect) {
  imgUploadPreview.className = `img-upload__preview ${effect}`;
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
  imgUploadPreview.removeAttribute(`style`);
});

let intensityEffect = function (value) {
  switch (imgUploadPreview.className) {
    case `img-upload__preview effects__preview--chrome`:
      imgUploadPreview.style = `filter: grayscale(${value / 100})`;
      break;
    case `img-upload__preview effects__preview--sepia`:
      imgUploadPreview.style = `filter: sepia(${value / 100})`;
      break;
    case `img-upload__preview effects__preview--marvin`:
      imgUploadPreview.style = `filter: invert(${value}%)`;
      break;
    case `img-upload__preview effects__preview--phobos`:
      imgUploadPreview.style = `filter: blur(${value / 33.3}px)`;
      break;
    case `img-upload__preview effects__preview--heat`:
      imgUploadPreview.style = `filter: brightness(${value / 50 + 1})`;
      break;
  }
};

effectLevelLine.addEventListener(`mouseup`, function (evt) {
  let value = effectLevelValue.value;
  value = evt.offsetX * 100 / 450;
  intensityEffect(value);
});

// Проверка хэш-тегов
let textHashtags = imgUploadOverlay.querySelector(`.text__hashtags`);
let imgUploadSubmit = imgUploadOverlay.querySelector(`.img-upload__submit`);

let re = /^#[a-zA-Z0-9]{1,19}$/;

let getCheckHashtags = function () {
  let hashtags = textHashtags.value.toLowerCase().split(` `);

  for (let i = 0; i < hashtags.length; i++) {
    if (!re.test(hashtags[i])) {
      textHashtags.setCustomValidity(`некорректный хэш-тэг`);
    }
    if (hashtags[i].indexOf(`#`, 1) > -1) {
      textHashtags.setCustomValidity(`хэш-теги разделяются пробелами`);
    }
    if (hashtags.length > 5) {
      textHashtags.setCustomValidity(`нельзя указать больше 5 хэш-тегов`);
    }
    if (hashtags.indexOf(hashtags[i], i + 1) > -1) {
      textHashtags.setCustomValidity(
          `один и тот же хэш-тег не может быть использован дважды`
      );
    }
  }
};

let clearMessage = function () {
  textHashtags.setCustomValidity(``);
};

imgUploadSubmit.addEventListener(`click`, function () {
  getCheckHashtags();
});

textHashtags.addEventListener(`input`, function () {
  clearMessage();
});
