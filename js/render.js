import { findTemplate, renderPack } from './domUtils.js';

/** @type {HTMLAnchorElement} */
const template = findTemplate('picture');
const templateLoadError = findTemplate('data-error');

// Функция для показа ошибки
const showLoadError = () => {
  const errorElement = templateLoadError.cloneNode(true);
  document.body.appendChild(errorElement);

  // Автоматическое скрытие ошибки через 5 секунд
  setTimeout(() => {
    errorElement.remove();
  }, 5000);
};

// Функция для создания элемента фото
const creatPhotoElement = (photo) => {
  /** @type {HTMLAnchorElement} */
  const photoElement = template.cloneNode(true);
  photoElement.href = photo.url;
  photoElement.dataset.id = photo.id;
  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__img').alt = photo.description;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
  return photoElement;
};

// Функция для отрисовки галереи
const renderGallery = (photos, container) => {
  renderPack(photos, creatPhotoElement, container);
};

const clearGallary = (container) => {
  container.querySelectorAll('a.picture').forEach((item) => item.remove());
};
export { creatPhotoElement, renderGallery, showLoadError,clearGallary };
