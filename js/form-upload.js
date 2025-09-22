import { sendData } from './api.js';

import { isEscapeKey } from './utils.js';

import { showElement, hideElement, addModalOpen, removeModalOpen, findTemplate } from './dom-utils';

import { textHashtagsElement, textDescriptionElement, formUploadElement, validateForm, pristine } from './form-validate';

import { DEFAULT_SCALE, previewImgUploadElement, updateScale } from './edit-load-img';

import { resetSlider } from './no-uislider';

import './form-validate.js';

const FILE_TYPES = ['.jpeg', '.jpg', '.png', '.gif', '.jfif'];

const uploadInputElement = document.querySelector('#upload-file');

const formEditImgElement = document.querySelector('.img-upload__overlay');

const formEditImgCloseBtnElement = document.querySelector('.img-upload__cancel');

const submitButtonElement = formUploadElement.querySelector('.img-upload__submit');

const effectPreviewElements = document.querySelectorAll('.effects__preview');

const successTemplateElement = findTemplate('success');

const errorTemplateElement = findTemplate('error');

let onDocumentKeydown = null;

let currentMessageElement = null;
textHashtagsElement.addEventListener('input', () => {
  // Если поле пустое или содержит только пробелы - сбрасываем валидацию
  if (!textHashtagsElement.value.trim()) {
    pristine.reset();
  }
});

const clearAllErrors = () => {
  pristine.reset();
  const errorElements = document.querySelectorAll('.pristine-error');
  errorElements.forEach((element) => element.remove());
  textHashtagsElement.classList.remove('img-upload__field-wrapper--error');
  textDescriptionElement.classList.remove('img-upload__field-wrapper--error');
};
// Также для поля описания (на всякий случай)
const getFormData = () => {
  const formData = new FormData(formUploadElement);
  // Добавляем очищенные хэштеги
  formData.set('hashtags', textHashtagsElement.value.trim().replaceAll(/\s+/g, ' '));
  return formData;
};


// Функция блокировки кнопки отправки
const toggleSubmitButton = (isDisabled) => {
  submitButtonElement.disabled = isDisabled;
  submitButtonElement.textContent = isDisabled ? 'Отправка...' : 'Опубликовать';
};

const closeFormEditImg = () => {
  hideElement(formEditImgElement);
  removeModalOpen();
  uploadInputElement.value = '';
  previewImgUploadElement.src = 'img/upload-default-image.jpg';
  effectPreviewElements.forEach((preview) => {
    preview.style.backgroundImage = 'none';
  });
  updateScale(DEFAULT_SCALE);
  previewImgUploadElement.style.filter = 'none';
  formUploadElement.reset();
  resetSlider();
  pristine.reset();
  const errorElements = document.querySelectorAll('.pristine-error');
  errorElements.forEach((element) => element.remove());
  textDescriptionElement.addEventListener('input', () => {
    if (!textDescriptionElement.value.trim()) {
      pristine.reset();
      clearAllErrors();
    }
  });

  textHashtagsElement.addEventListener('input', () => {
    if (textHashtagsElement.value.trim() === '') {
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
    const messageInnerElement = messageElement.querySelector(isError ? '.error__inner' : '.success__inner');
    if (messageInnerElement && !messageInnerElement.contains(evt.target)) {
      closeMessage();
    }
  };

  // Обработчик кнопки закрытия
  const closeButtonElement = messageElement.querySelector(isError ? '.error__button' : '.success__button');
  if (closeButtonElement) {
    // Предотвращаем всплытие события от кнопки
    closeButtonElement.addEventListener('click', (evt) => {
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

  document.addEventListener('keydown', onMessageKeydown);
  document.addEventListener('click', onDocumentClick);
  if (!isError) {
    closeButtonElement.focus();
  }
};

const showSuccessMessage = () => {
  showMessage(successTemplateElement, false);
};

const showErrorMessage = () => {
  showMessage(errorTemplateElement, true);
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
    textHashtagsElement.value = textHashtagsElement.value.trim().replaceAll(/\s+/g, ' ');
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
    const isFocusInInput = document.activeElement === textHashtagsElement ||
                          document.activeElement === textDescriptionElement;

    if (!isFocusInInput) {
      evt.preventDefault();
      closeFormEditImg();
    }
  }
};

const openFormEditImg = () => {
  uploadInputElement.addEventListener ('change', () => {
    showElement(formEditImgElement);
    addModalOpen();
    document.addEventListener('keydown', onDocumentKeydown);
  });
};

const updateEffectsPreviews = (imageUrl) => {
  effectPreviewElements.forEach((preview) => {
    preview.style.backgroundImage = `url(${imageUrl})`;
  });
};

formUploadElement.addEventListener('submit', onFormSubmit);

formEditImgCloseBtnElement.addEventListener('click', () => {
  closeFormEditImg();
});

openFormEditImg();

uploadInputElement.addEventListener('change', (event) => {
  const file = event.target.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    const objectUrl = URL.createObjectURL(file);
    previewImgUploadElement.src = objectUrl;
    updateEffectsPreviews(objectUrl);
  }
});

export { openFormEditImg };
