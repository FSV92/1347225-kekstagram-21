"use strict";

(function () {
  let templatePicture = document
    .querySelector(`#picture`)
    .content.querySelector(`.picture`);
  let pictures = document.querySelector(`.pictures`);

  let getRandomInRange = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  let getRandomFromArray = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  let renderPhoto = function (photo) {
    let photoElement = templatePicture.cloneNode(true);

    photoElement.querySelector(`.picture__img`).src = photo.url;
    photoElement.querySelector(`.picture__likes`).textContent = photo.likes;
    photoElement.querySelector(`.picture__comments`).textContent =
      photo.numberComments;

    return photoElement;
  };
  let comments = [];
  let photos = [];
  let addPhotos = function (quantity) {
    let photo = {};
    let comment = {};

    for (let i = 1; i <= quantity; i++) {
      comment = {
        avatar: `img/avatar-${getRandomInRange(1, 6)}.svg`,
        message: getRandomFromArray(window.data.MESSAGES),
        name: getRandomFromArray(window.data.NAMES),
      };
      comments.push(comment);

      photo = {
        url: `photos/${i}.jpg`,
        description: `Просто фото.`,
        likes: getRandomInRange(15, 200),
        numberComments: getRandomInRange(1, 50),
        textComment: comments[i]
      };
      photos.push(photo);
    }

    let fragment = document.createDocumentFragment();
    for (let i = 0; i < photos.length; i++) {
      fragment.appendChild(renderPhoto(photos[i]));
    }
    pictures.appendChild(fragment);
  };

  window.gallery = {
    comments,
    photos,
    pictures,
    addPhotos
  };
})();
