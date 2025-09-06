const pageBody = document.querySelector('body');

const addClass = (element, className) => {
  if (element) {
    element.classList.add(className);
  }
};

const removeClass = (element, className) => {
  if (element) {
    element.classList.remove(className);
  }
};

const hideElement = (element) => {
  addClass(element, 'hidden');
};

const showElement = (element) => {
  removeClass(element, 'hidden');
};

const removeModalOpen = () => {
  pageBody.classList.remove('modal-open');
};

const addModalOpen = () => {
  pageBody.classList.add('modal-open');
};

const findTemplate = (id) => {
  const template = document.getElementById(id);

  if (!template) {
    throw new Error(`Template not found: ${id}`);
  }

  if (!(template instanceof HTMLTemplateElement)) {
    throw new Error(`Element is not a Template: ${id}`);
  }

  return template.content.firstElementChild;
};

const makeCommentElement = (comment) => {
  const commentElement = document.createElement('li');
  commentElement.className = 'social__comment';
  commentElement.innerHTML = `
    <img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35">
    <p class="social__text">${comment.message}</p>
  `;
  return commentElement;
};

const renderPack = (items, makeElement, container) => {
  const fragment = document.createDocumentFragment();
  items.forEach((item) => fragment.appendChild(makeElement(item)));
  container.appendChild(fragment);
};

export { findTemplate, renderPack, makeCommentElement, hideElement, showElement, removeModalOpen, addModalOpen};
