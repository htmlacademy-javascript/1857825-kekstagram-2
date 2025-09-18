import { getData } from './api.js';
import { renderGallery, showLoadError } from './render.js';
import { initBigPicture } from './renderBigPicture.js';
import { initFilters } from './filter.js';
import './formUpload.js';
import './editLoadImg.js';
import './noUiSlider.js';

const usersPhotoList = document.querySelector('.pictures');
let similarPhotoDescriptions = [];

const rerenderGallery = (photos, container) => {
  renderGallery(photos, container);
};

const initApp = async () => {
  try {
    similarPhotoDescriptions = await getData();
    // Первоначальная отрисовка
    renderGallery(similarPhotoDescriptions, usersPhotoList);
    // Инициализируем функционал большого фото
    initBigPicture(similarPhotoDescriptions, usersPhotoList);
    initFilters(similarPhotoDescriptions, rerenderGallery, usersPhotoList);
  } catch (error) {
    similarPhotoDescriptions = [];
    showLoadError();
  }
};

initApp();
