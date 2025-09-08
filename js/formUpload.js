import { isEscapeKey } from './utils';

import { showElement, hideElement, addModalOpen, removeModalOpen } from './domUtils';

import { textHashtags, textDescription, formUpload } from './formValidate';

import { DEFAULT_SCALE, previewImgUpload, updateScale } from './editLoadImg';

import './formValidate/';

const uploadInput = document.querySelector('#upload-file');

const formEditImg = document.querySelector('.img-upload__overlay');

const formEditImgCloseBtn = document.querySelector('.img-upload__cancel');

let onDocumentKeydown = null;

const closeFormEditImg = () => {
  hideElement(formEditImg);
  removeModalOpen();
  uploadInput.value = '';
  updateScale(DEFAULT_SCALE);
  previewImgUpload.style.filter = 'none';
  formUpload.reset();
  document.removeEventListener('keydown', onDocumentKeydown);
};

onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    const isFocusInInput = document.activeElement === textHashtags ||
                          document.activeElement === textDescription;

    if (!isFocusInInput) {
      evt.preventDefault();
      closeFormEditImg();
    }
  }
};

const openFormEditImg = () => {
  uploadInput.addEventListener ('change', () => {
    showElement(formEditImg);
    addModalOpen();
    document.addEventListener('keydown', onDocumentKeydown);
  });
};

formEditImgCloseBtn.addEventListener('click', () => {
  closeFormEditImg();
});


openFormEditImg();

export { openFormEditImg };
