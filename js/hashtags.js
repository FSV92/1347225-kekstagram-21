'use strict';

let textHashtags = window.form.imgUploadOverlay.querySelector(`.text__hashtags`);
let imgUploadSubmit = window.form.imgUploadOverlay.querySelector(`.img-upload__submit`);

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

window.hashtags = {
  textHashtags
};
