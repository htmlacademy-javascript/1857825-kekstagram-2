import { sendData } from './api';

import { isEscapeKey } from './utils';

import { showElement, hideElement, addModalOpen, removeModalOpen, findTemplate } from './domUtils';

import { textHashtags, textDescription, formUpload, validateForm } from './formValidate';

import { DEFAULT_SCALE, previewImgUpload, updateScale } from './editLoadImg';

import { resetSlider } from './noUiSlider';

import './formValidate/';

const uploadInput = document.querySelector('#upload-file');

const formEditImg = document.querySelector('.img-upload__overlay');

const formEditImgCloseBtn = document.querySelector('.img-upload__cancel');

const submitButton = formUpload.querySelector('.img-upload__submit');

const successTemplate = findTemplate('success');

const errorTemplate = findTemplate('error');

let onDocumentKeydown = null;

let currentMessageElement = null;

const getFormData = () => {
  const formData = new FormData(formUpload);
  // Добавляем очищенные хэштеги
  formData.set('hashtags', textHashtags.value.trim().replaceAll(/\s+/g, ' '));
  return formData;
};


// Функция блокировки кнопки отправки
const toggleSubmitButton = (isDisabled) => {
  submitButton.disabled = isDisabled;
  submitButton.textContent = isDisabled ? 'Отправка...' : 'Опубликовать';
};

const closeFormEditImg = () => {
  hideElement(formEditImg);
  removeModalOpen();
  uploadInput.value = '';
  updateScale(DEFAULT_SCALE);
  previewImgUpload.style.filter = 'none';
  formUpload.reset();
  resetSlider();
  document.removeEventListener('keydown', onDocumentKeydown);
};

const showMessage = (template, isError = false) => {
  // Удаляем предыдущее сообщение, если есть
  if (currentMessageElement) {
    currentMessageElement.remove();
  }

  const messageElement = template.cloneNode(true);
  document.body.appendChild(messageElement);
  currentMessageElement = messageElement;

  // Обработчик клавиши Esc
  const onMessageKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeMessage();
    }
  };

  // Обработчик клика вне сообщения
  const onDocumentClick = (evt) => {
    // Проверяем, что клик был именно вне блока сообщения
    const messageInner = messageElement.querySelector(isError ? '.error__inner' : '.success__inner');
    if (messageInner && !messageInner.contains(evt.target)) {
      closeMessage();
    }
  };

  // Обработчик кнопки закрытия
  const closeButton = messageElement.querySelector(isError ? '.error__button' : '.success__button');
  if (closeButton) {
    // Предотвращаем всплытие события от кнопки
    closeButton.addEventListener('click', (evt) => {
      evt.stopPropagation();
      closeMessage();
    });
  }

  function closeMessage () {
    messageElement.remove();
    currentMessageElement = null;
    document.removeEventListener('keydown', onMessageKeydown);
    document.removeEventListener('click', onDocumentClick);
  }

  // Добавляем обработчики
  document.addEventListener('keydown', onMessageKeydown);
  document.addEventListener('click', onDocumentClick);
  if (!isError) {
    closeButton.focus();
  }
};

const showSuccessMessage = () => {
  showMessage(successTemplate, false);
};

const showErrorMessage = () => {
  showMessage(errorTemplate, true);
};

// Функция отправки формы
const onFormSubmit = async (evt) => {
  evt.preventDefault();
  evt.stopPropagation();
  if (!validateForm()) {
    return;
  }

  toggleSubmitButton(true);

  try {
    textHashtags.value = textHashtags.value.trim().replaceAll(/\s+/g, ' ');
    const formData = getFormData();

    await sendData(formData);

    showSuccessMessage();

    closeFormEditImg();

  } catch (error) {

    showErrorMessage();

  } finally {
    toggleSubmitButton(false);
  }
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

formUpload.addEventListener('submit', onFormSubmit);

formEditImgCloseBtn.addEventListener('click', () => {
  closeFormEditImg();
});

openFormEditImg();

export { openFormEditImg };
