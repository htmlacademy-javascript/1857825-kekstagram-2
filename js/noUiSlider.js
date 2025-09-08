import { EFFECTS, filterByEffectObj } from './imgEffects';
import { previewImgUpload } from './editLoadImg';
import { hideElement, showElement } from './domUtils';

const maxEffectLevel = 100;
const sliderElement = document.querySelector('.effect-level__slider');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const effectLevelInput = document.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list'); // Родительский элемент

effectLevelInput.value = maxEffectLevel;

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 80,
  step: 1,
  connect: 'lower',
});

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

const applyEffect = (effectName, value) => {
  if (effectName === 'none') {
    previewImgUpload.style.filter = 'none';
    hideElement(sliderContainer);
  } else {
    const effectFunction = filterByEffectObj[effectName];
    previewImgUpload.style.filter = effectFunction(value);
    showElement(sliderContainer);
  }
};

// Инициализация
hideElement(sliderContainer);
const initialEffect = document.querySelector('.effects__radio:checked').value;
if (initialEffect !== 'none') {
  updateSliderSettings(initialEffect);
  applyEffect(initialEffect, EFFECTS[initialEffect].start);
}

sliderElement.noUiSlider.on('update', () => {
  const currentValue = sliderElement.noUiSlider.get();
  effectLevelInput.value = currentValue;
  const selectedEffect = document.querySelector('.effects__radio:checked').value;
  applyEffect(selectedEffect, currentValue);
});

// Один обработчик на родительском элементе (не накапливается)
effectsList.addEventListener('change', (evt) => {
  if (evt.target.classList.contains('effects__radio')) {
    const effectName = evt.target.value;
    if (effectName === 'none') {
      applyEffect('none');
      effectLevelInput.value = maxEffectLevel;
    } else {
      updateSliderSettings(effectName);
      const initialValue = EFFECTS[effectName].start;
      applyEffect(effectName, initialValue);
      effectLevelInput.value = initialValue;
    }
  }
});

