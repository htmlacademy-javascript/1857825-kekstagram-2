import { getData } from './api.js';
import { renderGallery, showLoadError } from './render.js';
import { initBigPicture } from './renderBigPicture.js';
import { initFilters } from './filter.js';
import './formUpload.js';
import './editLoadImg.js';
import './noUiSlider.js';

if (navigator.userAgent.includes('WebKit')) {
  const originalDataTransfer = window.DataTransfer;

  window.DataTransfer = function() {
    const instance = new originalDataTransfer();
    const files = [];

    if (!instance.items.add) {
      instance.items.add = function(file) {
        files.push(file);
        Object.defineProperty(instance, 'files', {
          value: Object.freeze(files.slice()),
          writable: false
        });
      };
    }

    return instance;
  };

  // Наследуем прототип
  window.DataTransfer.prototype = originalDataTransfer.prototype;
}

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
    // Инициализируем фильтры, передавая:
    // 1. Данные
    // 2. Функцию для перерисовки
    // 3. Контейнер
    initFilters(similarPhotoDescriptions, rerenderGallery, usersPhotoList);
  } catch (error) {
    similarPhotoDescriptions = [];
    showLoadError();
  }
};

initApp();
