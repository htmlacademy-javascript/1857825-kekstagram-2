import { hideElement, showElement, makeCommentElement, renderPack } from './dom-utils.js';

const COMMENTS_TO_SHOW = 5;

const commentsListElement = document.querySelector('.social__comments');

const shownCommentsCountElement = document.querySelector('.social__comment-shown-count');

const commentLoaderElement = document.querySelector('.comments-loader');

let currentComments = [];
let shownComments = 0;

const loadMoreComments = () => {
  const remainingComments = currentComments.length - shownComments;
  const commentsToLoad = Math.min(remainingComments, COMMENTS_TO_SHOW);
  const nextComments = currentComments.slice(shownComments, shownComments + commentsToLoad);
  renderPack(nextComments, makeCommentElement, commentsListElement);
  shownComments += commentsToLoad;
  shownCommentsCountElement.textContent = shownComments.toString();
  if (shownComments >= currentComments.length) {
    hideElement(commentLoaderElement);
  }
};

const onCommentLoaderClick = () => {
  loadMoreComments();
};

const createComments = (currentPhoto) => {
  commentsListElement.innerHTML = '';
  commentLoaderElement.removeEventListener('click', onCommentLoaderClick);

  currentComments = currentPhoto.comments || [];
  shownComments = 0;

  if (currentComments.length === 0) {
    shownCommentsCountElement.textContent = '0';
    hideElement(commentLoaderElement);
    return;
  }

  if (currentComments.length > COMMENTS_TO_SHOW) {
    showElement(commentLoaderElement);
  } else {
    hideElement(commentLoaderElement);
  }

  loadMoreComments();
  commentLoaderElement.addEventListener('click', onCommentLoaderClick);
};


export { createComments };
