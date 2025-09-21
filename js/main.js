import { getData } from './api.js';
import { renderGallery, showLoadError } from './render.js';
import { initBigPicture } from './render-big-picture.js';
import { initFilters } from './filter.js';
import './form-upload.js';
import './edit-load-img.js';
import './no-uislider.js';

const usersPhotoListElement = document.querySelector('.pictures');
let similarPhotoDescriptions = [];

const rerenderGallery = (photos, container) => {
  renderGallery(photos, container);
};

const initApp = async () => {
  try {
    similarPhotoDescriptions = await getData();
    // Первоначальная отрисовка
    renderGallery(similarPhotoDescriptions, usersPhotoListElement);
    // Инициализируем функционал большого фото
    initBigPicture(similarPhotoDescriptions, usersPhotoListElement);
    initFilters(similarPhotoDescriptions, rerenderGallery, usersPhotoListElement);
  } catch (error) {
    similarPhotoDescriptions = [];
    showLoadError();
  }
};

initApp();
