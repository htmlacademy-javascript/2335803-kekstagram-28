const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const listPicturesFragment = document.createDocumentFragment();

const createNewPicture = (id, url, comments, likes) => {
  const newPictureTemplate = pictureTemplate.cloneNode(true);
  newPictureTemplate.querySelector('.picture__img').src = url;
  newPictureTemplate.querySelector('.picture__img').id = id;
  newPictureTemplate.querySelector('.picture__comments').textContent = comments.length;
  newPictureTemplate.querySelector('.picture__likes').textContent = likes;
  return newPictureTemplate;
};

const renderAllPictures = (createdPhotoObjects) => {
  createdPhotoObjects.forEach(({id, url, comments, likes}) => {
    listPicturesFragment.appendChild(createNewPicture(id, url, comments, likes));
  });
  picturesContainer.appendChild(listPicturesFragment);
};

export {renderAllPictures};
