const chromeSepiaSliderObj = {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1
};

const defaultMarvinSliderObj = {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1
};

const phobosSliderObj = {
  range: {
    min: 0,
    max: 3,
  },
  start: 3,
  step: 0.1
};

const heatSliderObj = {
  range: {
    min: 1,
    max: 3,
  },
  start: 3,
  step: 0.1
};

const EFFECTS = {
  chrome: chromeSepiaSliderObj,
  marvin: defaultMarvinSliderObj,
  sepia: chromeSepiaSliderObj,
  phobos: phobosSliderObj,
  heat: heatSliderObj,
  none: defaultMarvinSliderObj
};

const getCromeStyleEffect = (value) => `grayscale(${value})`;
const getMarvinStyleEffect = (value) => `invert(${value}%)`;
const getSepiaStyleEffect = (value) => `sepia(${value})`;
const getPhobosStyleEffect = (value) => `blur(${value}px)`;
const getHeatStyleEffect = (value) => `brightness(${value})`;

const filterByEffectObj = {
  chrome: getCromeStyleEffect,
  marvin: getMarvinStyleEffect,
  sepia: getSepiaStyleEffect,
  phobos: getPhobosStyleEffect,
  heat: getHeatStyleEffect
};

export { EFFECTS, filterByEffectObj};
