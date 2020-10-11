"use strict";

(function () {
  let bigPicture = document.querySelector(`.big-picture`);
  let bigPictureImg = bigPicture
    .querySelector(`.big-picture__img`)
    .querySelector(`img`);
  let bigPictureLikes = bigPicture.querySelector(`.likes-count`);
  let bigPictureComments = bigPicture.querySelector(`.comments-count`);
  let socialCaption = bigPicture.querySelector(`.social__caption`);
  let socialComments = bigPicture.querySelectorAll(`.social__comment`);
  let socialCommentCount = bigPicture.querySelector(`.social__comment-count`);
  let commentsLoader = bigPicture.querySelector(`.comments-loader`);
  let bigPictureCancel = bigPicture.querySelector(`.big-picture__cancel`);

  window.gallery.addPhotos(25);

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

      bigPictureLikes.textContent = evt.target.nextElementSibling.lastElementChild.textContent;
      bigPictureComments.textContent = evt.target.nextElementSibling.firstElementChild.textContent;
    }
  };

  let closeBigPhoto = function () {
    bigPicture.classList.add(`hidden`);
    document.removeEventListener(`keydown`, closeBigPhotoEsc);
    document.querySelector(`body`).classList.remove(`modal-open`);
  };

  for (let i = 0; i < socialComments.length; i++) {
    socialComments[i].querySelector(`img`).src =
      window.gallery.comments[i].avatar;
    socialComments[i].querySelector(`img`).alt =
      window.gallery.comments[i].name;
    socialComments[i].querySelector(`.social__text`).textContent =
      window.gallery.comments[i].message;
  }

  socialCaption.textContent = window.gallery.photos[0].description;
  socialCommentCount.classList.add(`hidden`);
  commentsLoader.classList.add(`hidden`);

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
})();
