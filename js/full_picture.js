import {isEscapeKey, createElement} from './utils.js';
import {LIMIT_RENDER_COMMENTS} from './data.js';

const bigPicture = document.querySelector('.big-picture');
const allRenderedPictures = document.querySelector('.pictures');
const bigPictureCancelButton = bigPicture.querySelector('.big-picture__cancel');
const bigPictureSocial = bigPicture.querySelector('.big-picture__social');
const commentTemplate = document.querySelector('#comment')
  .content
  .querySelector('.social__comment');
const commentsCount = bigPicture.querySelector('.social__comment-count');
const commentsLoaderButton = bigPicture.querySelector('.comments-loader');
let displayedCommentsCount = 0;
let commentsContainer;

const createCommentsElements = () => {
  const allBigPictureComments = createElement('ul', 'social__comments');
  let i = 0;
  commentsContainer.forEach(({avatar, message, name}) => {
    if (i === displayedCommentsCount - 1) {
      return;
    }
    const newCommentTemplate = commentTemplate.cloneNode(true);
    newCommentTemplate.querySelector('.social__picture').src = avatar;
    newCommentTemplate.querySelector('.social__picture').alt = name;
    newCommentTemplate.querySelector('.social__text').textContent = message;
    allBigPictureComments.appendChild(newCommentTemplate);
    i ++;
  });
  return allBigPictureComments;
};

const renderBigPictureComments = () => {
  const previousComments = bigPicture.querySelector('.social__comments');
  previousComments.parentNode.removeChild(previousComments);
  bigPictureSocial.insertBefore(createCommentsElements (), commentsLoaderButton);
};

const getClickedPicture = (photoObjects, element) => {
  const picture = element.closest('.picture');
  return photoObjects.find((object) => Number(picture.id) === Number(object.id));
};

const calculateCommentsQuantity = (allCommentsCount) => {
  if (allCommentsCount < LIMIT_RENDER_COMMENTS || allCommentsCount - displayedCommentsCount < LIMIT_RENDER_COMMENTS) {
    displayedCommentsCount = allCommentsCount;
    commentsLoaderButton.classList.add('hidden');
  } else {
    displayedCommentsCount = displayedCommentsCount + LIMIT_RENDER_COMMENTS;
  }

  commentsCount.innerHTML = `${displayedCommentsCount} из <span class="comments-count" id="comments-count">${allCommentsCount}</span> комментариев`;
};

const onPictureOpenClick = (photoObjects, evt) => {
  const picture = getClickedPicture(photoObjects, evt.target);

  document.querySelector('body').classList.add('modal-open');
  bigPicture.querySelector('img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.social__caption').textContent = picture.description;
  commentsContainer = picture.comments;
  bigPicture.querySelector('.comments-count').textContent = commentsContainer.length;
  calculateCommentsQuantity (commentsContainer.length);
  renderBigPictureComments(commentsContainer);
  bigPicture.classList.remove('hidden');
};

const onButtonLoadMoreComments = () => {
  calculateCommentsQuantity (bigPicture.querySelector('.comments-count').textContent);
  renderBigPictureComments ();
};

const onButtonCloseClick = () => {
  document.querySelector('body').classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  displayedCommentsCount = 0;
  bigPictureCancelButton.removeEventListener('click', onButtonCloseClick);
  commentsLoaderButton.removeEventListener('click', onButtonLoadMoreComments);
  commentsLoaderButton.classList.remove('hidden');
};

document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    onButtonCloseClick();
  }
});

const addFullPictureListeners = () => {
  bigPictureCancelButton.addEventListener('click', onButtonCloseClick);
  commentsLoaderButton.addEventListener('click', onButtonLoadMoreComments);
};

const renderFullPicture = (photoObjects) => allRenderedPictures.addEventListener('click', (evt) => {
  if (evt.target.closest('.picture')) {
    onPictureOpenClick(photoObjects, evt);
    addFullPictureListeners();
  }
});

export {renderFullPicture};
