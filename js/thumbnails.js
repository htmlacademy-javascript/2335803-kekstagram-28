const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const listPicturesFragment = document.createDocumentFragment();

const createNewPicture = (url, comments, likes) => {
  const newPictureTemplate = pictureTemplate.cloneNode(true);
  newPictureTemplate.querySelector('.picture__img').src = url;
  newPictureTemplate.querySelector('.picture__comments').textContent = comments;
  newPictureTemplate.querySelector('.picture__likes').textContent = likes;
  return newPictureTemplate;
};

const renderAllPictures = (createdPhotoObjects) => {
  createdPhotoObjects.forEach(({url, comments, likes}) => {
    listPicturesFragment.appendChild(createNewPicture(url, comments, likes));
  });
  picturesContainer.appendChild(listPicturesFragment);
};

export {renderAllPictures};
