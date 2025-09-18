import { sendData } from './api';

import { isEscapeKey } from './utils';

import { showElement, hideElement, addModalOpen, removeModalOpen, findTemplate } from './domUtils';

import { textHashtags, textDescription, formUpload, validateForm, pristine } from './formValidate';

import { DEFAULT_SCALE, previewImgUpload, updateScale } from './editLoadImg';

import { resetSlider } from './noUiSlider';

import './formValidate/';

const FILE_TYPES = ['.jpeg', '.jpg', '.png', '.gif', '.jfif'];

const uploadInput = document.querySelector('#upload-file');

const formEditImg = document.querySelector('.img-upload__overlay');

const uploadFileInputElem = formUpload.querySelector('.img-upload__input');

const formEditImgCloseBtn = document.querySelector('.img-upload__cancel');

const submitButton = formUpload.querySelector('.img-upload__submit');

const successTemplate = findTemplate('success');

const errorTemplate = findTemplate('error');

let onDocumentKeydown = null;

let currentMessageElement = null;
textHashtags.addEventListener('input', () => {
  // Если поле пустое или содержит только пробелы - сбрасываем валидацию
  if (!textHashtags.value.trim()) {
    pristine.reset();
  }
});

const clearAllErrors = () => {
  pristine.reset();
  const errorElements = document.querySelectorAll('.pristine-error');
  errorElements.forEach((element) => element.remove());
  textHashtags.classList.remove('img-upload__field-wrapper--error');
  textDescription.classList.remove('img-upload__field-wrapper--error');
};
// Также для поля описания (на всякий случай)
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
  pristine.reset();
  const errorElements = document.querySelectorAll('.pristine-error');
  errorElements.forEach((element) => element.remove());
  textDescription.addEventListener('input', () => {
    if (!textDescription.value.trim()) {
      pristine.reset();
      clearAllErrors();
    }
  });

  textHashtags.addEventListener('input', () => {
    if (textHashtags.value.trim() === '') {
    // Скрываем ошибки когда поле пустое
      pristine.reset();
      clearAllErrors();
    }
  });
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
      evt.stopPropagation();
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
    if (currentMessageElement) {
      return;
    }
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

const updateEffectsPreviews = (imageUrl) => {
  const effectPreviews = document.querySelectorAll('.effects__preview');
  effectPreviews.forEach((preview) => {
    preview.style.backgroundImage = `url(${imageUrl})`;
  });
};

formUpload.addEventListener('submit', onFormSubmit);

formEditImgCloseBtn.addEventListener('click', () => {
  closeFormEditImg();
});

openFormEditImg();

uploadFileInputElem.addEventListener('change', (event) => {
  const file = event.target.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    const objectUrl = URL.createObjectURL(file);
    previewImgUpload.src = objectUrl;
    updateEffectsPreviews(objectUrl);
  }
});

export { openFormEditImg };
