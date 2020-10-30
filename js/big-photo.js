'use strict';

let bigPicture = document.querySelector(`.big-picture`);
let bigPictureImg = bigPicture
  .querySelector(`.big-picture__img`)
  .querySelector(`img`);
let bigPictureLikes = bigPicture.querySelector(`.likes-count`);
let bigPictureComments = bigPicture.querySelector(`.comments-count`);
let socialCaption = bigPicture.querySelector(`.social__caption`);
let socialComments = bigPicture.querySelector(`.social__comments`);
let socialComment = bigPicture.querySelector(`.social__comment`);
let socialCommentCount = bigPicture.querySelector(`.social__comment-count`);
let commentsLoader = bigPicture.querySelector(`.comments-loader`);
let bigPictureCancel = bigPicture.querySelector(`.big-picture__cancel`);
let lastNumberInString = (/\d+(?=\D*$)/);

let targetIndex;
let nextToLastShowedComment;
let getStartComments = function (evt) {
  nextToLastShowedComment = 5;
  socialCommentCount.firstChild.textContent = `${nextToLastShowedComment} из `;
  let startQuantity;
  targetIndex = evt.target.src.match(lastNumberInString) - 1;
  if (window.gallery.comments[targetIndex].length < 5) {
    startQuantity = window.gallery.comments[targetIndex].length;
    socialCommentCount.firstChild.textContent = `${window.gallery.comments[targetIndex].length} из `;
    commentsLoader.classList.add(`hidden`);
  } else {
    startQuantity = 5;
  }

  let fragment = document.createDocumentFragment();
  socialComments.innerHTML = ``;
  for (let i = 0; i < startQuantity; i++) {
    let templateSocialComment = socialComment.cloneNode(true);
    templateSocialComment.querySelector(`.social__text`).textContent = window.gallery.comments[targetIndex][i].message;
    templateSocialComment.querySelector(`.social__picture`).src = window.gallery.comments[targetIndex][i].avatar;
    templateSocialComment.querySelector(`.social__picture`).alt = window.gallery.comments[targetIndex][i].name;
    fragment.appendChild(templateSocialComment);
    nextToLastShowedComment = i + 1;
  }
  socialComments.appendChild(fragment);
};

let endShow;
let loadComments = function () {
  if (window.gallery.comments[targetIndex].length - nextToLastShowedComment > 5) {
    endShow = nextToLastShowedComment + 5;
  } else {
    endShow = window.gallery.comments[targetIndex].length;
    commentsLoader.classList.add(`hidden`);
  }

  let fragment = document.createDocumentFragment();
  for (let i = nextToLastShowedComment; i < endShow; i++) {
    let templateSocialComment = socialComment.cloneNode(true);
    templateSocialComment.querySelector(`.social__text`).textContent = window.gallery.comments[targetIndex][i].message;
    templateSocialComment.querySelector(`.social__picture`).src = window.gallery.comments[targetIndex][i].avatar;
    templateSocialComment.querySelector(`.social__picture`).alt = window.gallery.comments[targetIndex][i].name;
    fragment.appendChild(templateSocialComment);
    nextToLastShowedComment = i + 1;
    socialCommentCount.firstChild.textContent = `${nextToLastShowedComment} из `;

  }
  socialComments.appendChild(fragment);
};

let closeBigPhotoEsc = function (evt) {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    closeBigPhoto();
  }
};

let openBigPhoto = function (evt) {
  if (evt.target && evt.target.matches(`.picture__img`)) {
    bigPictureImg.src = evt.target.src;
    bigPicture.classList.remove(`hidden`);
    document.querySelector(`body`).classList.add(`modal-open`);
    document.addEventListener(`keydown`, closeBigPhotoEsc);
    commentsLoader.classList.remove(`hidden`);

    bigPictureLikes.textContent = evt.target.nextElementSibling.lastElementChild.textContent;
    bigPictureComments.textContent = evt.target.nextElementSibling.firstElementChild.textContent;
    socialCaption.textContent = window.gallery.descriptions[(String(evt.target.src.match(lastNumberInString))) - 1];
    getStartComments(evt);
    commentsLoader.addEventListener(`click`, loadComments);
  }
};

let closeBigPhoto = function () {
  bigPicture.classList.add(`hidden`);
  document.removeEventListener(`keydown`, closeBigPhotoEsc);
  document.querySelector(`body`).classList.remove(`modal-open`);
  socialComments.innerHTML = ``;
  commentsLoader.removeEventListener(`click`, loadComments);
};

window.gallery.pictures.addEventListener(`click`, function (evt) {
  openBigPhoto(evt);
});

window.gallery.pictures.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    bigPictureImg.src = evt.target.querySelector(`img`).src;
    bigPicture.classList.remove(`hidden`);
    document.querySelector(`body`).classList.add(`modal-open`);
    document.addEventListener(`keydown`, closeBigPhotoEsc);

    bigPictureLikes.textContent = evt.target.querySelector(`.picture__likes`).textContent;
    bigPictureComments.textContent = evt.target.querySelector(`.picture__comments`).textContent;
  }
});

bigPictureCancel.addEventListener(`click`, function () {
  closeBigPhoto();
});

window.bigPhoto = {
  socialCaption
};
