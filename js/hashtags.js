'use strict';

const QUANTUTY_HASHTAGS = 5;
let textHashtags = window.form.imgUploadOverlay.querySelector(`.text__hashtags`);
let imgUploadSubmit = window.form.imgUploadOverlay.querySelector(`.img-upload__submit`);

let re = /^(#[a-zA-Z0-9]{1,19}|$)$/;

function getCheckHashtags() {
  let hashtags = textHashtags.value.toLowerCase().split(` `).filter(function (tag) {
    return tag;
  });

  for (let i = 0; i < hashtags.length; i++) {
    if (!re.test(hashtags[i])) {
      textHashtags.setCustomValidity(`некорректный хэш-тэг`);
    }
    if (hashtags[i].indexOf(`#`, 1) > -1) {
      textHashtags.setCustomValidity(`хэш-теги разделяются пробелами`);
    }
    if (hashtags.length > QUANTUTY_HASHTAGS) {
      textHashtags.setCustomValidity(`нельзя указать больше 5 хэш-тегов`);
    }
    if (hashtags.indexOf(hashtags[i], i + 1) > -1) {
      textHashtags.setCustomValidity(
          `один и тот же хэш-тег не может быть использован дважды`
      );
    }
  }
}

function clearMessage() {
  textHashtags.setCustomValidity(``);
}

imgUploadSubmit.addEventListener(`click`, function () {
  getCheckHashtags();
});

textHashtags.addEventListener(`input`, function () {
  clearMessage();
});

window.hashtags = {
  textHashtags
};
