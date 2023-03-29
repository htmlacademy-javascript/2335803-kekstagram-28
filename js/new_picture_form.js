import {isEscapeKey} from './utils.js';
import {checkNewPictureForm} from './validation_new_picture_form.js';
import {applyPictureEffect, deletePictureEffect} from './new_picture_effects.js';
import {SCALE_MAX_VALUE, SCALE_VALUE_DOWN, SCALE_MIN_VALUE, SCALE_VALUE_UP, SCALE_CHANGING_STEP} from './data.js';

const newPictureUpload = document.querySelector('.img-upload');
const effectNone = newPictureUpload.querySelector('#effect-none');
const uploadFileButton = newPictureUpload.querySelector('#upload-file');
const newPictureWindow = newPictureUpload.querySelector('.img-upload__overlay');
const newPicureCancelButton = newPictureUpload.querySelector('.img-upload__cancel');
const scaleControl = newPictureUpload.querySelector('.img-upload__scale');
const newPicturePreview = newPictureUpload.querySelector('.img-upload__preview')
  .querySelector('img');
const scaleControlValue = scaleControl.querySelector('.scale__control--value');
const sliderContainer = document.querySelector('.img-upload__effect-level');


const openNewPictureForm = () => {
  newPictureWindow.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
};

const onButtonChangeScale = (evt) => {
  const previousScaleValue = parseInt(scaleControlValue.value.match(/\d+/), 10);
  let newScaleValue;
  switch (evt.target.textContent) {
    case SCALE_VALUE_UP:
      newScaleValue = previousScaleValue + SCALE_CHANGING_STEP > SCALE_MAX_VALUE ?
        SCALE_MAX_VALUE : previousScaleValue + SCALE_CHANGING_STEP;
      break;
    case SCALE_VALUE_DOWN:
      newScaleValue = previousScaleValue - SCALE_CHANGING_STEP < SCALE_MIN_VALUE ?
        SCALE_MIN_VALUE : previousScaleValue - SCALE_CHANGING_STEP;
      break;
    default:
      return;
  }
  newPicturePreview.style.transform = `scale(${newScaleValue / 100})`;
  scaleControlValue.value = `${newScaleValue}%`;
};

const onButtonCloseClick = () => {
  document.querySelector('body').classList.remove('modal-open');
  newPictureWindow.classList.add('hidden');
  newPicturePreview.removeAttribute('class');
  newPicturePreview.removeAttribute('style');
  sliderContainer.classList.add('hidden');
  scaleControlValue.value = '100%';
  effectNone.checked = true;
  uploadFileButton.value = '';
  scaleControl.removeEventListener('click', onButtonChangeScale);
  deletePictureEffect();
};

const addListeners = () => {
  newPicureCancelButton.addEventListener('click', onButtonCloseClick);
  document.addEventListener('keydown', (evt) => {
    const activeElement = () => document.activeElement.id === 'description' || document.activeElement.id === 'hashtags';
    if (isEscapeKey(evt) && !activeElement()) {
      onButtonCloseClick();
    }
  });
  scaleControl.addEventListener('click', onButtonChangeScale);
};

const renderNewPictureForm = () => uploadFileButton.addEventListener('input', () => {
  // if (uploadFileButton.value.includes('.jpg')) {
  //   openNewPictureForm();
  //   applyPictureEffect ();
  //   checkNewPictureForm ();
  //   addListeners();
  // }
  openNewPictureForm();
  applyPictureEffect ();
  checkNewPictureForm ();
  addListeners();
});

export {renderNewPictureForm};
