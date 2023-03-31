import {isEscapeKey, createElement} from './utils.js';

const bigPicture = document.querySelector('.big-picture');
const allRenderedPictures = document.querySelector('.pictures');
const bigPictureCancelButton = bigPicture.querySelector('.big-picture__cancel');
const bigPictureSocial = bigPicture.querySelector('.big-picture__social');
const commentTemplate = document.querySelector('#comment')
  .content
  .querySelector('.social__comment');

const renderBigPictureComments = (commentsContainer) => {
  const previousComments = bigPicture.querySelector('.social__comments');
  previousComments.parentNode.removeChild(previousComments);
  const allBigPictureComments = createElement('ul', 'social__comments');

  commentsContainer.forEach(({avatar, message, name}) => {
    const newCommentTemplate = commentTemplate.cloneNode(true);
    newCommentTemplate.querySelector('.social__picture').src = avatar;
    newCommentTemplate.querySelector('.social__picture').alt = name;
    newCommentTemplate.querySelector('.social__text').textContent = message;
    allBigPictureComments.appendChild(newCommentTemplate);
  });
  bigPictureSocial.appendChild(allBigPictureComments);
};

const getClickedPicture = (photoObjects, element) => {
  const picture = element.closest('.picture');
  return photoObjects.find((object) => Number(picture.id) === Number(object.id));
};

const onPictureOpenClick = (photoObjects, evt) => {
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');
  document.querySelector('body').classList.add('modal-open');

  const picture = getClickedPicture(photoObjects, evt.target);
  bigPicture.querySelector('img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.social__caption').textContent = picture.description;
  bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
  renderBigPictureComments(picture.comments);
  bigPicture.classList.remove('hidden');
};

const onButtonCloseClick = () => {
  document.querySelector('body').classList.remove('modal-open');
  bigPicture.classList.add('hidden');
};

const hideFullPicture = () => bigPictureCancelButton.addEventListener('click', onButtonCloseClick);
document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    onButtonCloseClick();
  }
});

const renderFullPicture = (photoObjects) => allRenderedPictures.addEventListener('click', (evt) => {
  if (evt.target.closest('.picture')) {
    onPictureOpenClick(photoObjects, evt);
    hideFullPicture();
  }
});

export {renderFullPicture};
