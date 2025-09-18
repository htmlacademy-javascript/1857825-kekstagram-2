import { createComments } from './createComments.js';

import { isEscapeKey } from './utils.js';

import { hideElement, showElement, removeModalOpen, addModalOpen } from './domUtils.js';

let onDocumentKeydown = null;

const bigPicture = document.querySelector('.big-picture');

const bigPictureImg = bigPicture.querySelector('.big-picture__img img');

const bigPictureLikeCount = bigPicture.querySelector('.likes-count');

const bigPictureTotalComments = document.querySelector('.social__comment-total-count');

const bigPictureDescription = bigPicture.querySelector('.social__caption');

const bigPictureButtonClose = bigPicture.querySelector('.big-picture__cancel');

const closeBigPicture = () => {
  hideElement(bigPicture);
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
  showElement(bigPicture);
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
        bigPictureImg.src = selectedPhoto.url;
        bigPictureLikeCount.textContent = selectedPhoto.likes;
        bigPictureTotalComments.textContent = selectedPhoto.comments.length;
        bigPictureDescription.textContent = selectedPhoto.description;

        createComments(selectedPhoto);
        openBigPicture();
      }
    }
  });
  bigPictureButtonClose.addEventListener('click', closeBigPicture);
};

export { initBigPicture };

