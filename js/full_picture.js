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
let fullPictureComments;

const renderBigPictureComments = () => {
  const previousComments = bigPicture.querySelector('.social__comments');
  previousComments.parentNode.removeChild(previousComments);
  const allBigPictureComments = createElement('ul', 'social__comments');

  for (let i = 0; i < displayedCommentsCount; i ++) {
    const newCommentTemplate = commentTemplate.cloneNode(true);
    newCommentTemplate.querySelector('.social__picture').src = fullPictureComments[i].avatar;
    newCommentTemplate.querySelector('.social__picture').alt = fullPictureComments[i].name;
    newCommentTemplate.querySelector('.social__text').textContent = fullPictureComments[i].message;
    allBigPictureComments.appendChild(newCommentTemplate);
  }
  bigPictureSocial.appendChild(allBigPictureComments);
};

const getClickedPicture = (photoObjects, element) => {
  const picture = element.closest('.picture');
  return photoObjects.find((object) => Number(picture.id) === Number(object.id));
};

const calculateCommentsQuantity = (allCommentsCount) => {
  const commentsCountDescription = commentsCount.innerHTML.split(' ');

  if (allCommentsCount < LIMIT_RENDER_COMMENTS) {
    displayedCommentsCount = allCommentsCount;
  } else if (allCommentsCount - displayedCommentsCount < LIMIT_RENDER_COMMENTS) {
    displayedCommentsCount = allCommentsCount;
  } else {
    displayedCommentsCount = displayedCommentsCount + LIMIT_RENDER_COMMENTS;
  }
  commentsCountDescription[0] = displayedCommentsCount;
  commentsCount.innerHTML = commentsCountDescription.join(' ');
};

const onPictureOpenClick = (photoObjects, evt) => {
  document.querySelector('body').classList.add('modal-open');

  const picture = getClickedPicture(photoObjects, evt.target);
  bigPicture.querySelector('img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.social__caption').textContent = picture.description;
  fullPictureComments = picture.comments;
  bigPicture.querySelector('.comments-count').textContent = fullPictureComments.length;
  calculateCommentsQuantity (fullPictureComments.length);
  renderBigPictureComments();
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
