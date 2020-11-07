'use strict';

const QUANTITY_PHOTOS = 10;
const FIRST_TWO_ELEMENTS = 2;

const IMG_FILTERS = document.querySelector(`.img-filters`);
const IMG_FILTERS_FORM = IMG_FILTERS.querySelector(`.img-filters__form`);
const NUMBER_IN_STRING = /\d+/;

IMG_FILTERS.classList.remove(`img-filters--inactive`);

function removePhoto() {
  while (window.gallery.PICTURES.children.length > FIRST_TWO_ELEMENTS) {
    window.gallery.PICTURES.removeChild(window.gallery.PICTURES.lastChild);
  }
}

function addPhotos(photos, length) {
  let fragment = document.createDocumentFragment();
  for (let i = 0; i < length; i++) {
    fragment.appendChild(window.gallery.renderPhoto(photos[i]));
  }
  window.gallery.PICTURES.appendChild(fragment);
}

function addingPhotos(photos) {
  addPhotos(photos, photos.length);
}

function replacingPhotos(photos) {
  removePhoto();
  addPhotos(photos, photos.length);
}

function addingLimitedPhotos(photos) {
  removePhoto();
  addPhotos(photos, QUANTITY_PHOTOS);
}

function getDefaultPhotos(photos) {
  photos.sort((prev, next) => {
    return prev.url.match(NUMBER_IN_STRING) - next.url.match(NUMBER_IN_STRING);
  });
  replacingPhotos(photos);
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomPhotos(photos) {
  let randomNumber;
  let getRandomElement;
  for (let i = photos.length - 1; i > 0; i--) {
    randomNumber = getRandomNumber(0, i);
    getRandomElement = photos[randomNumber];
    photos[randomNumber] = photos[i];
    photos[i] = getRandomElement;
  }
  addingLimitedPhotos(photos);
}


function getDiscussedPhotos(photos) {
  photos.sort((prev, next) => {
    return next.comments.length - prev.comments.length;
  });
  replacingPhotos(photos);
}

IMG_FILTERS_FORM.addEventListener(`click`, window.debounce((evt) => {
  switch (evt.target.id) {
    case `filter-random`:
      getRandomPhotos(window.sentPhotos);
      break;
    case `filter-discussed`:
      getDiscussedPhotos(window.sentPhotos);
      break;
    default:
      getDefaultPhotos(window.sentPhotos);
      break;
  }
}));

IMG_FILTERS_FORM.addEventListener(`click`, (evt) => {
  switch (evt.target.id) {
    case `filter-random`:
      IMG_FILTERS_FORM.querySelector(`#filter-default`).classList.remove(`img-filters__button--active`);
      IMG_FILTERS_FORM.querySelector(`#filter-discussed`).classList.remove(`img-filters__button--active`);
      evt.target.classList.add(`img-filters__button--active`);
      break;
    case `filter-discussed`:
      IMG_FILTERS_FORM.querySelector(`#filter-default`).classList.remove(`img-filters__button--active`);
      IMG_FILTERS_FORM.querySelector(`#filter-random`).classList.remove(`img-filters__button--active`);
      evt.target.classList.add(`img-filters__button--active`);
      break;
    default:
      IMG_FILTERS_FORM.querySelector(`#filter-random`).classList.remove(`img-filters__button--active`);
      IMG_FILTERS_FORM.querySelector(`#filter-discussed`).classList.remove(`img-filters__button--active`);
      evt.target.classList.add(`img-filters__button--active`);
      break;
  }
});

window.galleryFilter = {
  addingPhotos
};
