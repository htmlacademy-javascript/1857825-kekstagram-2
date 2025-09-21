const pageBodyElement = document.querySelector('body');

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
  pageBodyElement.classList.remove('modal-open');
};

const addModalOpen = () => {
  pageBodyElement.classList.add('modal-open');
};

const findTemplate = (id) => {
  const templateElement = document.getElementById(id);

  if (!templateElement) {
    throw new Error(`Template not found: ${id}`);
  }

  if (!(templateElement instanceof HTMLTemplateElement)) {
    throw new Error(`Element is not a Template: ${id}`);
  }

  return templateElement.content.firstElementChild;
};

const makeCommentElement = (comment) => {
  const commentElement = document.createElement('li');
  commentElement.className = 'social__comment';
  const imgCommentElement = document.createElement('img');
  imgCommentElement.className = 'social__picture';
  imgCommentElement.src = comment.avatar;
  imgCommentElement.alt = comment.name;
  imgCommentElement.width = 35;
  imgCommentElement.height = 35;

  const textCommentElement = document.createElement('p');
  textCommentElement.className = 'social__text';
  textCommentElement.textContent = comment.message;

  commentElement.appendChild(imgCommentElement);
  commentElement.appendChild(textCommentElement);

  return commentElement;
};

const renderPack = (items, makeElement, container) => {
  const fragment = document.createDocumentFragment();
  items.forEach((item) => fragment.appendChild(makeElement(item)));
  container.appendChild(fragment);
};

export { findTemplate, renderPack, makeCommentElement, hideElement, showElement, removeModalOpen, addModalOpen, removeClass, addClass};
