'use strict';

const MIN_DISPLAYED_COMMENTS = 5;

const BIG_PICTURE = document.querySelector(`.big-picture`);
const BIG_PICTURE_IMG = BIG_PICTURE
  .querySelector(`.big-picture__img`)
  .querySelector(`img`);
const BIG_PICTURE_LIKES = BIG_PICTURE.querySelector(`.likes-count`);
const BIG_PICTURE_COMMENTS = BIG_PICTURE.querySelector(`.comments-count`);
const SOCIAL_CAPTION = BIG_PICTURE.querySelector(`.social__caption`);
const SOCIAL_COMMENTS = BIG_PICTURE.querySelector(`.social__comments`);
const SOCIAL_COMMENT = BIG_PICTURE.querySelector(`.social__comment`);
const SOCIAL_COMMENT_COUNT = BIG_PICTURE.querySelector(`.social__comment-count`);
const COMMENTS_LOADER = BIG_PICTURE.querySelector(`.comments-loader`);
const BIG_PICTURE_CANCEL = BIG_PICTURE.querySelector(`.big-picture__cancel`);
const LAST_NUMBER_IN_STRING = (/\d+(?=\D*$)/);

let targetIndex;
let lastComments;
let startQuantity;
let comments;

function renderComments(start, end) {
  comments = window.gallery.comments[targetIndex].slice(start, end);

  let fragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    let templateSocialComment = SOCIAL_COMMENT.cloneNode(true);
    templateSocialComment.querySelector(`.social__text`).textContent = comment.message;
    templateSocialComment.querySelector(`.social__picture`).src = comment.avatar;
    templateSocialComment.querySelector(`.social__picture`).alt = comment.name;
    fragment.appendChild(templateSocialComment);
  });
  SOCIAL_COMMENTS.appendChild(fragment);
}

function getStartComments(evt) {
  SOCIAL_COMMENT_COUNT.firstChild.textContent = `${MIN_DISPLAYED_COMMENTS} из `;
  targetIndex = evt.target.src.match(LAST_NUMBER_IN_STRING) - 1;

  if (window.gallery.comments[targetIndex].length < MIN_DISPLAYED_COMMENTS) {
    startQuantity = window.gallery.comments[targetIndex].length;
    SOCIAL_COMMENT_COUNT.firstChild.textContent = `${window.gallery.comments[targetIndex].length} из `;
    COMMENTS_LOADER.classList.add(`hidden`);
  } else {
    startQuantity = MIN_DISPLAYED_COMMENTS;
  }

  SOCIAL_COMMENTS.innerHTML = ``;

  renderComments(0, startQuantity);

  lastComments = comments.length;
}


function onLoadComments() {
  let endShow;
  if (window.gallery.comments[targetIndex].length - lastComments > MIN_DISPLAYED_COMMENTS) {
    endShow = lastComments + MIN_DISPLAYED_COMMENTS;
  } else {
    endShow = window.gallery.comments[targetIndex].length;
    COMMENTS_LOADER.classList.add(`hidden`);
  }

  renderComments(lastComments, endShow);

  SOCIAL_COMMENT_COUNT.firstChild.textContent = `${endShow} из `;

  lastComments = endShow;
}

function onCloseBigPhotoEsc(evt) {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    closeBigPhoto();
  }
}

function openBigPhoto(evt) {
  if (evt.target && evt.target.matches(`.picture__img`)) {
    BIG_PICTURE_IMG.src = evt.target.src;
    BIG_PICTURE.classList.remove(`hidden`);
    document.querySelector(`body`).classList.add(`modal-open`);
    document.addEventListener(`keydown`, onCloseBigPhotoEsc);
    COMMENTS_LOADER.classList.remove(`hidden`);

    BIG_PICTURE_LIKES.textContent = evt.target.nextElementSibling.lastElementChild.textContent;
    BIG_PICTURE_COMMENTS.textContent = evt.target.nextElementSibling.firstElementChild.textContent;
    SOCIAL_CAPTION.textContent = window.gallery.descriptions[(String(evt.target.src.match(LAST_NUMBER_IN_STRING))) - 1];
    getStartComments(evt);
    COMMENTS_LOADER.addEventListener(`click`, onLoadComments);
  }
}

function closeBigPhoto() {
  BIG_PICTURE.classList.add(`hidden`);
  document.removeEventListener(`keydown`, onCloseBigPhotoEsc);
  document.querySelector(`body`).classList.remove(`modal-open`);
  SOCIAL_COMMENTS.innerHTML = ``;
  COMMENTS_LOADER.removeEventListener(`click`, onLoadComments);
}

window.gallery.PICTURES.addEventListener(`click`, (evt) => {
  openBigPhoto(evt);
});

window.gallery.PICTURES.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter`) {
    BIG_PICTURE_IMG.src = evt.target.querySelector(`img`).src;
    BIG_PICTURE.classList.remove(`hidden`);
    document.querySelector(`body`).classList.add(`modal-open`);
    document.addEventListener(`keydown`, onCloseBigPhotoEsc);

    BIG_PICTURE_LIKES.textContent = evt.target.querySelector(`.picture__likes`).textContent;
    BIG_PICTURE_COMMENTS.textContent = evt.target.querySelector(`.picture__comments`).textContent;
  }
});

BIG_PICTURE_CANCEL.addEventListener(`click`, () => {
  closeBigPhoto();
});

window.bigPhoto = {
  SOCIAL_CAPTION
};
