import {createPhotoObjects} from './data.js';

const createdPhotoObjects = createPhotoObjects();
const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const listPicturesFragment = document.createDocumentFragment();

createdPhotoObjects.forEach(({url, comments, likes}) => {
  const newPictureTemplate = pictureTemplate.cloneNode(true);
  const pictureImg = newPictureTemplate.querySelector('.picture__img');
  const pictureComments = pictureTemplate.querySelector('.picture__comments');
  const pictureLikes = pictureTemplate.querySelector('.picture__likes');
  pictureImg.src = url;
  pictureComments.textContent = comments;
  pictureLikes.textContent = likes;
  listPicturesFragment.appendChild(newPictureTemplate);
});

picturesContainer.appendChild(listPicturesFragment);
