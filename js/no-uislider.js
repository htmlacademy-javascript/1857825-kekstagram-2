import { EFFECTS, filterByEffectObj } from './img-effects.js';
import { previewImgUploadElement } from './edit-load-img.js';
import { hideElement, showElement } from './dom-utils.js';

const maxEffectLevel = 100;
const sliderElement = document.querySelector('.effect-level__slider');
const sliderContainerElement = document.querySelector('.img-upload__effect-level');
const effectLevelInputElement = document.querySelector('.effect-level__value');
const effectsListElement = document.querySelector('.effects__list');

effectLevelInputElement.value = maxEffectLevel;

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 80,
  step: 1,
  connect: 'lower',
});

const applyEffect = (effectName, value) => {
  if (effectName === 'none') {
    previewImgUploadElement.style.filter = 'none';
    hideElement(sliderContainerElement);
  } else {
    const effectFunction = filterByEffectObj[effectName];
    previewImgUploadElement.style.filter = effectFunction(value);
    showElement(sliderContainerElement);
  }
};

const resetSlider = () => {
  // Сбрасываем слайдер на максимальное значение
  sliderElement.noUiSlider.set(maxEffectLevel);
  // Сбрасываем выбор эффекта на "none"
  const noneRadio = document.querySelector('#effect-none');
  if (noneRadio) {
    noneRadio.checked = true;
  }
  applyEffect('none');
  effectLevelInputElement.value = maxEffectLevel;
  hideElement(sliderContainerElement);
};

const updateSliderSettings = (effectName) => {
  const effectSettings = EFFECTS[effectName];
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: effectSettings.range.min,
      max: effectSettings.range.max
    },
    start: effectSettings.start,
    step: effectSettings.step
  });
};

hideElement(sliderContainerElement);
const initialEffect = document.querySelector('.effects__radio:checked').value;
if (initialEffect !== 'none') {
  updateSliderSettings(initialEffect);
  applyEffect(initialEffect, EFFECTS[initialEffect].start);
}

const formatEffectValue = (value) => parseFloat(value).toString();

sliderElement.noUiSlider.on('update', () => {
  const currentValue = sliderElement.noUiSlider.get();
  effectLevelInputElement.value = formatEffectValue(currentValue);
  const selectedEffect = document.querySelector('.effects__radio:checked').value;
  applyEffect(selectedEffect, currentValue);
});

effectsListElement.addEventListener('change', (evt) => {
  if (evt.target.classList.contains('effects__radio')) {
    const effectName = evt.target.value;
    if (effectName === 'none') {
      applyEffect('none');
      effectLevelInputElement.value = maxEffectLevel;
    } else {
      updateSliderSettings(effectName);
      const initialValue = EFFECTS[effectName].start;
      applyEffect(effectName, initialValue);
      effectLevelInputElement.value = initialValue;
    }
  }
});

export { maxEffectLevel, resetSlider };

