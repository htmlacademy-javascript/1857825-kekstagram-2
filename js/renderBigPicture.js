import { renderPack, makeCommentElement } from './domUtils';

import { usersPhotoList, similarPhotoDescriptions } from './render';

import { isEscapeKey } from './utils.js';

let onDocumentKeydown = null;

const bigPicture = document.querySelector('.big-picture');

const bigPictureImg = bigPicture.querySelector('.big-picture__img img');

const bigPictureLikeCount = bigPicture.querySelector('.likes-count');

const bigPictureTotalComments = bigPicture.querySelector('.social__comment-total-count');

const bigPictureShowComments = bigPicture.querySelector('.social__comment-shown-count');

const bigPictureDescription = bigPicture.querySelector('.social__caption');

const bigPictureButtonClose = bigPicture.querySelector('.big-picture__cancel');

const commentsList = document.querySelector('.social__comments');

const commentsAdd = 5;

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const openBigPicture = () => {
  bigPicture.classList.remove('hidden');
  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};


usersPhotoList.addEventListener('click', (event) => {
  // Проверяем, что кликнули по миниатюре (или её дочернему элементу)
  const thumbnail = event.target.closest('.picture');
  if (thumbnail) {
    event.preventDefault();
    const photoId = parseInt(thumbnail.dataset.id, 10);

    const selectedPhoto = similarPhotoDescriptions.find((photo)=> photo.id === photoId);
    bigPictureImg.src = selectedPhoto.url;
    bigPictureLikeCount.textContent = selectedPhoto.likes;
    bigPictureTotalComments.textContent = selectedPhoto.comments.length;
    bigPictureShowComments.textContent = commentsAdd;
    bigPictureDescription.textContent = selectedPhoto.description;

    commentsList.innerHTML = ''; // Очищаем перед рендером

    renderPack(selectedPhoto.comments, makeCommentElement, commentsList);
    openBigPicture();
  }
});

bigPictureButtonClose.addEventListener('click', closeBigPicture);
