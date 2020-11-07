'use strict';

const QUANTUTY_HASHTAGS = 5;
const TEXT_HASHTAGS = window.form.IMG_UPLOAD_OVERLAY.querySelector(`.text__hashtags`);
const IMG_UPLOAD_SUBMIT = window.form.IMG_UPLOAD_OVERLAY.querySelector(`.img-upload__submit`);

const RE = /^(#[a-zA-Zа-яА-Я0-9]{1,19}|$)$/;

function getCheckHashtags() {
  let hashtags = TEXT_HASHTAGS.value.toLowerCase().split(` `).filter(function (tag) {
    return tag;
  });

  hashtags.forEach((tag, i) => {
    if (!RE.test(tag)) {
      TEXT_HASHTAGS.setCustomValidity(`некорректный хэш-тэг`);
    }
    if (tag.indexOf(`#`, 1) > -1) {
      TEXT_HASHTAGS.setCustomValidity(`хэш-теги разделяются пробелами`);
    }
    if (hashtags.length > QUANTUTY_HASHTAGS) {
      TEXT_HASHTAGS.setCustomValidity(`нельзя указать больше 5 хэш-тегов`);
    }
    if (hashtags.indexOf(tag, i + 1) > -1) {
      TEXT_HASHTAGS.setCustomValidity(
          `один и тот же хэш-тег не может быть использован дважды`
      );
    }
  });
}

function clearMessage() {
  TEXT_HASHTAGS.setCustomValidity(``);
}

IMG_UPLOAD_SUBMIT.addEventListener(`click`, () => {
  getCheckHashtags();
});

TEXT_HASHTAGS.addEventListener(`input`, () => {
  clearMessage();
});

window.hashtags = {
  TEXT_HASHTAGS
};
