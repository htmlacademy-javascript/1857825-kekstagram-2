const scaleControlBiggerElement = document.querySelector('.scale__control--bigger');

const scaleControlSmallerElement = document.querySelector('.scale__control--smaller');

const scaleControlValueElement = document.querySelector('.scale__control--value');

const previewImgUploadElement = document.querySelector('.img-upload__preview img');

const DEFAULT_SCALE = 100;
let currentScale = DEFAULT_SCALE;

// Функции для изменения масштаба
const makeScaleBigger = (sizeImg) => Math.min(sizeImg + 25, 100);

const makeScaleSmoller = (sizeImg) => Math.max(sizeImg - 25, 25);

// Функция обновления масштаба
const updateScale = (scale) => {
  currentScale = scale;
  scaleControlValueElement.value = `${scale}%`;
  previewImgUploadElement.style.transform = `scale(${scale / 100})`;
};

// Инициализация начального масштаба
updateScale(DEFAULT_SCALE);

// Обработчики кликов
scaleControlBiggerElement.addEventListener('click', () => {
  updateScale(makeScaleBigger(currentScale));
});

scaleControlSmallerElement.addEventListener('click', () => {
  updateScale(makeScaleSmoller(currentScale));
});

export {DEFAULT_SCALE, previewImgUploadElement, updateScale};
