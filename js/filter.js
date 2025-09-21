import { debounce } from './utils.js';
import { clearGallary } from './render.js';
import { removeClass, addClass } from './dom-utils.js';

const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';
const BUTTON_SELECTOR = '.img-filters__button';

const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const getFilteredPhotos = (photos, filterType) => {
  switch (filterType) {
    case Filter.RANDOM:
      return [...photos].toSorted(() => Math.random() - 0.5).slice(0, 10);
    case Filter.DISCUSSED:
      return [...photos].toSorted((a, b) => b.comments.length - a.comments.length);
    case Filter.DEFAULT:
    default:
      return [...photos];
  }
};

const initFilters = (photos, renderGalleryCallback, container) => {
  const filtersContainerElement = document.querySelector('.img-filters');
  removeClass(filtersContainerElement, 'img-filters--inactive');

  // Активная кнопка по умолчанию
  const defaultButtonElement = document.querySelector('#filter-default');
  if (defaultButtonElement) {
    addClass(defaultButtonElement, ACTIVE_BUTTON_CLASS);
  }

  const applyFilter = debounce((filterId) => {
    clearGallary(container);
    const filteredPhotos = getFilteredPhotos(photos, filterId);
    renderGalleryCallback(filteredPhotos, container);
  }, 500);

  const onFilterClick = (evt) => {
    const filterButton = evt.target.closest(BUTTON_SELECTOR);

    if (!filterButton || filterButton.classList.contains(ACTIVE_BUTTON_CLASS)) {
      return;
    }

    const activeButtonElements = document.querySelectorAll(`${BUTTON_SELECTOR}.${ACTIVE_BUTTON_CLASS}`);
    activeButtonElements.forEach((button) => removeClass(button, ACTIVE_BUTTON_CLASS));
    addClass(filterButton, ACTIVE_BUTTON_CLASS);

    applyFilter(filterButton.id);
  };

  filtersContainerElement.addEventListener('click', onFilterClick);
};

export { initFilters };
