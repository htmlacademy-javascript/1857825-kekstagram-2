import { makeCommentElement, renderPack } from './domUtils';

const COMMENTS_TO_SHOW = 5;

const commentsList = document.querySelector('.social__comments');

const shownCommentsCount = document.querySelector('.social__comment-shown-count');

const commentLoader = document.querySelector('.comments-loader');

let currentComments = [];
let shownComments = 0;

const loadMoreComments = () => {
  const remainingComments = currentComments.length - shownComments;
  const commentsToLoad = Math.min(remainingComments, COMMENTS_TO_SHOW);
  const nextComments = currentComments.slice(shownComments, shownComments + commentsToLoad);
  renderPack(nextComments, makeCommentElement, commentsList);
  shownComments += commentsToLoad;
  shownCommentsCount.textContent = shownComments;
  if (shownComments >= currentComments.length) {
    commentLoader.classList.add('hidden');
  }
};

const onCommentLoaderClick = () => {
  loadMoreComments();
};

const createComments = (currentPhoto) => {
  commentsList.innerHTML = '';
  commentLoader.removeEventListener('click', onCommentLoaderClick);

  currentComments = currentPhoto.comments || [];
  shownComments = 0;

  if (currentComments.length === 0) {
    shownCommentsCount.textContent = '0';
    commentLoader.classList.add('hidden');
    return;
  }

  if (currentComments.length > COMMENTS_TO_SHOW) {
    commentLoader.classList.remove('hidden');
  } else {
    commentLoader.classList.add('hidden');
  }

  loadMoreComments();
  commentLoader.addEventListener('click', onCommentLoaderClick);
};


export { createComments };
