import {createPhotoObjects} from './data.js';

const createdPhotoObjects = createPhotoObjects();
const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const listPicturesFragment = document.createDocumentFragment();

const createNewPicture = (url, comments, likes) => {
  const newPictureTemplate = pictureTemplate.cloneNode(true);
  const pictureImg = newPictureTemplate.querySelector('.picture__img').src = url;
  const pictureComments = pictureTemplate.querySelector('.picture__comments').textContent = comments;
  const pictureLikes = pictureTemplate.querySelector('.picture__likes').textContent = likes;
  return newPictureTemplate;
};

const renderAllPictures = () => {
  createdPhotoObjects.forEach(({url, comments, likes}) => {
    listPicturesFragment.appendChild(createNewPicture(url, comments, likes));
  });
  picturesContainer.appendChild(listPicturesFragment);
};

export {renderAllPictures};
