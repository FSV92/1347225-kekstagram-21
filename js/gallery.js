'use strict';

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
      photo.comments.length;

    return photoElement;
  };

  window.sentPhotos = [];
  let succesHandler = function (data) {
    window.sentPhotos = data;
    window.galleryFilter.addingPhotos(window.sentPhotos);
  };

  let errorHandler = function (errorMessage) {
    let node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = `20%`;
    node.style.right = `20%`;
    node.style.fontSize = `30px`;
    node.style.lineHeight = `30px`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  let comments = [];
  let photos = [];
  let addPhotos = function (quantity) {
    let photo = {};
    let comment = {};

    for (let i = 0; i < quantity; i++) {
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
  };

  window.backend.getPictures(succesHandler, errorHandler);

  window.gallery = {
    comments,
    photos,
    pictures,
    renderPhoto,
    addPhotos,
    errorHandler,
    getRandomFromArray
  };
})();
