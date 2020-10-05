"use strict";

const MESSAGES = [
  `Всё отлично!`,
  `В целом всё неплохо.Но не всё.`,
  `Когда вы делаете фотографию, хорошо бы убирать палец из кадра.В конце концов это просто непрофессионально.`,
  `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
  `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
  `Лица у людей на фотке перекошены, как будто их избивают.Как можно было поймать такой неудачный момент ?!`,
];
const NAMES = [`Артем`, `Сергей`, `Павел`, `Екатерина`, `Игорь`, `Елена`];

let picture = document
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
  let photoElement = picture.cloneNode(true);

  photoElement.querySelector(`.picture__img`).src = photo.url;
  photoElement.querySelector(`.picture__likes`).textContent = photo.likes;
  photoElement.querySelector(`.picture__comments`).textContent = photo.comments;

  return photoElement;
};

let comments = [];
let photos = [];
let addPhotos = function (quantity) {
  let photo = {};
  let comment = {};

  for (let i = 1; i <= quantity; i++) {
    for (let j = 1; j <= 6; j++) {
      comment[j] = {
        avatar: `img/avatar-${getRandomInRange(1, 6)}.svg`,
        message: getRandomFromArray(MESSAGES),
        name: getRandomFromArray(NAMES),
      };
      comments.push(comment[j]);
    }

    photo[i] = {
      url: `photos/${i}.jpg`,
      description: `Просто фото.`,
      likes: getRandomInRange(15, 200),
      comments: getRandomInRange(1, 50),
    };
    photos.push(photo[i]);
  }

  let fragment = document.createDocumentFragment();
  for (let i = 0; i < photos.length; i++) {
    fragment.appendChild(renderPhoto(photos[i]));
  }
  pictures.appendChild(fragment);
};
addPhotos(25);

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

// bigPicture.classList.remove(`hidden`);
bigPictureImg.src = photos[0].url;
bigPictureLikes.textContent = photos[0].likes;
bigPictureComments.textContent = photos[0].comments;
for (let i = 0; i < socialComments.length; i++) {
  socialComments[i].querySelector(`img`).src = comments[i].avatar;
  socialComments[i].querySelector(`img`).alt = comments[i].name;
  socialComments[i].querySelector(`.social__text`).textContent =
    comments[i].message;
}
socialCaption.textContent = photos[0].description;
socialCommentCount.classList.add(`hidden`);
commentsLoader.classList.add(`hidden`);
