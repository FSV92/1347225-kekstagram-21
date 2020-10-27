'use strict';

(function () {
  const QUANTITY_PHOTOS = 10;
  let imgFilters = document.querySelector(`.img-filters`);
  let imgFiltersForm = imgFilters.querySelector(`.img-filters__form`);
  let imgUploadSection = document.querySelector(`.img-upload`).outerHTML;
  let numberInString = /\d+/;

  imgFilters.classList.remove(`img-filters--inactive`);

  let addingPhotos = function (photos) {
    let fragment = document.createDocumentFragment();
    for (let i = 0; i < photos.length; i++) {
      fragment.appendChild(window.gallery.renderPhoto(photos[i]));
    }
    window.gallery.pictures.innerHTML = imgUploadSection;
    window.gallery.pictures.appendChild(fragment);
  };

  let addingLimitedPhotos = function (photos) {
    let fragment = document.createDocumentFragment();

    for (let i = 0; i < QUANTITY_PHOTOS; i++) {
      fragment.appendChild(window.gallery.renderPhoto(photos[i]));
    }
    window.gallery.pictures.innerHTML = imgUploadSection;
    window.gallery.pictures.appendChild(fragment);
  };

  let getDefaultPhotos = function (photos) {
    photos.sort(function (prev, next) {
      return prev.url.match(numberInString) - next.url.match(numberInString);
    });
    addingPhotos(photos);
  };

  let getRandomPhotos = function (photos) {
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
  };

  let getDiscussedPhotos = function (photos) {
    photos.sort(function (prev, next) {
      return next.comments.length - prev.comments.length;
    });
    addingPhotos(photos);
  };

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
}());
