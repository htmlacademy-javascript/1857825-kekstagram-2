const scaleControlBigger = document.querySelector('.scale__control--bigger');

const scaleControlSmaller = document.querySelector('.scale__control--smaller');

const scaleControlValue = document.querySelector('.scale__control--value');

const previewImgUpload = document.querySelector('.img-upload__preview img');

const DEFAULT_SCALE = 100;
let currentScale = DEFAULT_SCALE;

// Функции для изменения масштаба
const biggerScale = (sizeImg) => Math.min(sizeImg + 25, 100);

const smallerScale = (sizeImg) => Math.max(sizeImg - 25, 25);

// Функция обновления масштаба
const updateScale = (scale) => {
  currentScale = scale;
  scaleControlValue.value = `${scale}%`;
  previewImgUpload.style.transform = `scale(${scale / 100})`;
};

// Инициализация начального масштаба
updateScale(DEFAULT_SCALE);

// Обработчики кликов
scaleControlBigger.addEventListener('click', () => {
  updateScale(biggerScale(currentScale));
});

scaleControlSmaller.addEventListener('click', () => {
  updateScale(smallerScale(currentScale));
});

export {DEFAULT_SCALE, previewImgUpload, updateScale};
