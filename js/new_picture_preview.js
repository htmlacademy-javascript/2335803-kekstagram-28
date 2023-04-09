import {FILE_TYPES} from './data.js';

const newPicturePreview = document.querySelector('.img-upload__preview')
  .querySelector('img');
const fileChooser = document.querySelector('.img-upload__input');
const pictureEffectButtons = document.querySelectorAll('.effects__preview');

const renderNewImage = () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();
  if (FILE_TYPES.some((type) => fileName.endsWith(type))) {
    const urlFile = URL.createObjectURL(file);
    newPicturePreview.src = urlFile;
    pictureEffectButtons.forEach((button) => {
      button.style.backgroundImage = `url("${urlFile}")`;
    });
  }
};

export {renderNewImage};
