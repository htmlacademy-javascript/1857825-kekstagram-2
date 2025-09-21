import { createComments } from './create-сomments.js';

import { isEscapeKey } from './utils.js';

import { hideElement, showElement, removeModalOpen, addModalOpen } from './dom-utils.js';

let onDocumentKeydown = null;

const bigPictureElement = document.querySelector('.big-picture');

const bigPictureImgElement = bigPictureElement.querySelector('.big-picture__img img');

const bigPictureLikeCountElement = bigPictureElement.querySelector('.likes-count');

const bigPictureTotalCommentsElement = document.querySelector('.social__comment-total-count');

const bigPictureDescriptionElement = bigPictureElement.querySelector('.social__caption');

const bigPictureButtonCloseElement = bigPictureElement.querySelector('.big-picture__cancel');

const closeBigPicture = () => {
  hideElement(bigPictureElement);
  removeModalOpen();
  document.removeEventListener('keydown', onDocumentKeydown);
};

onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const openBigPicture = () => {
  showElement(bigPictureElement);
  addModalOpen();
  document.addEventListener('keydown', onDocumentKeydown);
};

const initBigPicture = (photoDescriptions, photosContainer) => {

  photosContainer.addEventListener('click', (event) => {
    // Проверяем, что кликнули по миниатюре (или её дочернему элементу)
    const thumbnail = event.target.closest('.picture');
    if (thumbnail) {
      event.preventDefault();
      const photoId = parseInt(thumbnail.dataset.id, 10);

      const selectedPhoto = photoDescriptions.find((photo)=> photo.id === photoId);

      if (selectedPhoto) {
        bigPictureImgElement.src = selectedPhoto.url;
        bigPictureLikeCountElement.textContent = selectedPhoto.likes;
        bigPictureTotalCommentsElement.textContent = selectedPhoto.comments.length;
        bigPictureDescriptionElement.textContent = selectedPhoto.description;

        createComments(selectedPhoto);
        openBigPicture();
      }
    }
  });
  bigPictureButtonCloseElement.addEventListener('click', closeBigPicture);
};

export { initBigPicture };

