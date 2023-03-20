const bigPicture = document.querySelector('.big-picture');
const allRenderedPictures = document.querySelector('.pictures');
const bigPictureClosing = bigPicture.querySelector('.big-picture__cancel');
const bigPictureSocial = bigPicture.querySelector('.big-picture__social');
const commentTemplate = document.querySelector('#comment')
  .content
  .querySelector('.social__comment');

const updateBigPictureComments = (comments) => {
  const previousComments = bigPicture.querySelector('.social__comments');
  previousComments.parentNode.removeChild(previousComments);
  const allBigPictureComments = document.createElement('ul');
  allBigPictureComments.classList.add('social__comments');

  comments.forEach(({avatar, message, name}) => {
    const newCommentTemplate = commentTemplate.cloneNode(true);
    newCommentTemplate.querySelector('.social__picture').src = avatar;
    newCommentTemplate.querySelector('.social__picture').alt = name;
    newCommentTemplate.querySelector('.social__text').textContent = message;
    allBigPictureComments.appendChild(newCommentTemplate);
  });
  bigPictureSocial.appendChild(allBigPictureComments);
};


const openBigPicture = (photoObjects, evt) => {
  bigPicture.querySelector('img').src = evt.target.src;
  for (const picture of photoObjects) {
    if (evt.target.src.includes(picture.url)) {
      bigPicture.querySelector('.social__comment-count').classList.add('hidden');
      bigPicture.querySelector('.comments-loader').classList.add('hidden');
      document.querySelector('body').classList.add('modal-open');
      bigPicture.querySelector('.likes-count').textContent = picture.likes;
      bigPicture.querySelector('.social__caption').textContent = picture.description;
      bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
      updateBigPictureComments(picture.comments);
      break;
    }
  }
  bigPicture.classList.remove('hidden');
};

const closeBigPicture = () => {
  document.querySelector('body').classList.remove('modal-open');
  bigPicture.classList.add('hidden');
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const renderFullPicture = (photoObjects) => allRenderedPictures.addEventListener('click', (evt) => {
  openBigPicture(photoObjects, evt);
});
const hideFullPicture = () => bigPictureClosing.addEventListener('click', closeBigPicture);
document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    closeBigPicture();
  }
});

export {renderFullPicture, hideFullPicture};
