'use strict';

const QUANTITY_PHOTOS = 10;
const FIRST_TWO_ELEMENTS = 2;
let imgFilters = document.querySelector(`.img-filters`);
let imgFiltersForm = imgFilters.querySelector(`.img-filters__form`);
let numberInString = /\d+/;

imgFilters.classList.remove(`img-filters--inactive`);

function removePhoto() {
  while (window.gallery.pictures.children.length > FIRST_TWO_ELEMENTS) {
    window.gallery.pictures.removeChild(window.gallery.pictures.lastChild);
  }
}

function addPhotos(photos, length) {
  let fragment = document.createDocumentFragment();
  for (let i = 0; i < length; i++) {
    fragment.appendChild(window.gallery.renderPhoto(photos[i]));
  }
  window.gallery.pictures.appendChild(fragment);
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
  photos.sort(function (prev, next) {
    return prev.url.match(numberInString) - next.url.match(numberInString);
  });
  replacingPhotos(photos);
}

function getRandomPhotos(photos) {
  let randomPhotos = [];
  let uniquePhotos = [];

  for (let i = 0; i < photos.length; i++) {
    randomPhotos[i] = window.gallery.getRandomFromArray(photos);
    randomPhotos.push(randomPhotos[i]);
  }
  uniquePhotos = randomPhotos.filter(function (photo, index) {
    return randomPhotos.indexOf(photo) === index;
  });
  addingLimitedPhotos(uniquePhotos);
}

function getDiscussedPhotos(photos) {
  photos.sort(function (prev, next) {
    return next.comments.length - prev.comments.length;
  });
  replacingPhotos(photos);
}

imgFiltersForm.addEventListener(`click`, window.debounce(function (evt) {
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

imgFiltersForm.addEventListener(`click`, function (evt) {
  switch (evt.target.id) {
    case `filter-random`:
      imgFiltersForm.querySelector(`#filter-default`).classList.remove(`img-filters__button--active`);
      imgFiltersForm.querySelector(`#filter-discussed`).classList.remove(`img-filters__button--active`);
      evt.target.classList.add(`img-filters__button--active`);
      break;
    case `filter-discussed`:
      imgFiltersForm.querySelector(`#filter-default`).classList.remove(`img-filters__button--active`);
      imgFiltersForm.querySelector(`#filter-random`).classList.remove(`img-filters__button--active`);
      evt.target.classList.add(`img-filters__button--active`);
      break;
    default:
      imgFiltersForm.querySelector(`#filter-random`).classList.remove(`img-filters__button--active`);
      imgFiltersForm.querySelector(`#filter-discussed`).classList.remove(`img-filters__button--active`);
      evt.target.classList.add(`img-filters__button--active`);
      break;
  }
});

window.galleryFilter = {
  addingPhotos,
  numberInString
};
