'use strict';

let templatePicture = document
  .querySelector(`#picture`)
  .content.querySelector(`.picture`);
let pictures = document.querySelector(`.pictures`);

function getRandomFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

let descriptions = [];
let comments = [];

function renderPhoto(photo) {
  let photoElement = templatePicture.cloneNode(true);

  photoElement.querySelector(`.picture__img`).src = photo.url;
  photoElement.querySelector(`.picture__likes`).textContent = photo.likes;
  photoElement.querySelector(`.picture__comments`).textContent =
    photo.comments.length;

  descriptions.push(photo.description);
  comments.push(photo.comments);

  return photoElement;
}

window.sentPhotos = [];

function succesHandler(data) {
  window.sentPhotos = data;
  window.galleryFilter.addingPhotos(window.sentPhotos);
}

function errorHandler(errorMessage) {
  let node = document.createElement(`div`);
  node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
  node.style.position = `absolute`;
  node.style.left = `20%`;
  node.style.right = `20%`;
  node.style.fontSize = `30px`;
  node.style.lineHeight = `30px`;

  node.textContent = errorMessage;
  document.body.insertAdjacentElement(`afterbegin`, node);
}

window.backend.getPictures(succesHandler, errorHandler);

window.gallery = {
  pictures,
  renderPhoto,
  errorHandler,
  getRandomFromArray,
  descriptions,
  comments
};
