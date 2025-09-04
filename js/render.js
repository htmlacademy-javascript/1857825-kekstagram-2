import { createArrayPhotoDescriptions } from './createArrayMiniatures.js';
import { findTemplate, renderPack } from './domUtils.js';

const SIMILAR_OBJECTS = 25;
/** @type {HTMLAncorElement} */
const template = findTemplate('picture');

const usersPhotoList = document.querySelector('.pictures');


const similarPhotoDescriptions = createArrayPhotoDescriptions(SIMILAR_OBJECTS);

const creatPhotoElement = (photo) => {
  /** @type {HTMLAncorElement} */
  const photoElement = template.cloneNode(true);
  photoElement.href = photo.url;
  photoElement.dataset.id = photo.id;
  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__img').alt = photo.description;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
  return photoElement;
};

renderPack(similarPhotoDescriptions, creatPhotoElement, usersPhotoList);

export { usersPhotoList, similarPhotoDescriptions };
