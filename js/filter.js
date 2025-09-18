import { debounce } from './utils.js';
import { clearGallary } from './render.js';
import { removeClass, addClass } from './domUtils.js';

// Константы для классов
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
  const filtersContainer = document.querySelector('.img-filters');
  removeClass(filtersContainer, 'img-filters--inactive');

  const onFilterClick = debounce((evt) => {
    const filterButton = evt.target.closest(BUTTON_SELECTOR);

    if (!filterButton || filterButton.classList.contains(ACTIVE_BUTTON_CLASS)) {
      return;
    }

    // Более читаемый и производительный вариант
    const activeButtons = document.querySelectorAll(`${BUTTON_SELECTOR}.${ACTIVE_BUTTON_CLASS}`);
    activeButtons.forEach((button) => removeClass(button, ACTIVE_BUTTON_CLASS));
    addClass(filterButton, ACTIVE_BUTTON_CLASS);
    clearGallary(container);

    const filteredPhotos = getFilteredPhotos(photos, filterButton.id);
    renderGalleryCallback(filteredPhotos, container);
  }, 500);

  filtersContainer.addEventListener('click', onFilterClick);
};

export { initFilters };
