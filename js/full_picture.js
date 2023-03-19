import {photoObjects} from './data.js';

const bigPicture = document.querySelector('.big-picture');
const allRenderedPictures = document.querySelector('.pictures');
const bigPictureClosing = bigPicture.querySelector('.big-picture__cancel');
//const commentTemplate = bigPicture.querySelector('#comment')
// .content
// .querySelector('.social__comment');

// const updateBigPictureComments = (comments) => {
//   bigPicture.classList.remove('social__comments');
//   const allBigPictureComments = document.createElement('ul').classList.add('social__comments');

//   comments.forEach(({avatar, message, name}) => {
//     const newCommentTemplate = commentTemplate.cloneNode(true);
//     newCommentTemplate.querySelector('.social__picture').src = avatar;
//     newCommentTemplate.querySelector('.social__picture').alt = name;
//     newCommentTemplate.querySelector('.social__text').textContent = message;
//     allBigPictureComments.appendChild(newCommentTemplate);
//   });
//   bigPicture.appendChild(allBigPictureComments);
// };


const openBigPicture = (evt) => {
  bigPicture.querySelector('img').src = evt.target.src;
  for (const picture of photoObjects) {
    if (evt.target.src.includes(picture.url)) {
      bigPicture.querySelector('.social__comment-count').classList.add('hidden');
      bigPicture.querySelector('.comments-loader').classList.add('hidden');
      document.querySelector('body').classList.add('modal-open');
      bigPicture.querySelector('.likes-count').textContent = picture.likes;
      bigPicture.querySelector('.social__caption').textContent = picture.description;
      bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
      //updateBigPictureComments(picture.comments);
    }
    break;
  }
  bigPicture.classList.remove('hidden');
};

const closeBigPicture = () => {
  document.querySelector('body').classList.remove('modal-open');
  bigPicture.classList.add('hidden');
};

const isEscapeKey = (evt) => evt.key === 'Escape';

allRenderedPictures.addEventListener('click', openBigPicture);
bigPictureClosing.addEventListener('click', closeBigPicture);
document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    closeBigPicture();
  }
});
