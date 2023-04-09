import {isEscapeKey} from './utils.js';
import {checkNewPictureForm, onCloseNotification, onSubmitForm} from './validation_new_picture_form.js';
import {applyPictureEffect, deletePictureEffect} from './new_picture_effects.js';
import {SCALE_MAX_VALUE, SCALE_VALUE_DOWN, SCALE_MIN_VALUE, SCALE_VALUE_UP, SCALE_CHANGING_STEP} from './data.js';
import {renderNewImage} from './new_picture_preview.js';


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
const hashtagsTextArea = newPictureUpload.querySelector('.text__hashtags');
const commentTextarea = newPictureUpload.querySelector('.text__description');
const newPictureForm = document.querySelector('.img-upload__form');
let notificationMesageElement;

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

const onButtonFormCloseClick = () => {
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
  hashtagsTextArea.value = '';
  commentTextarea.value = '';
};

const onEscapeCloseForm = (evt) => {
  const activeElement = () => document.activeElement.id === 'description' || document.activeElement.id === 'hashtags';
  if (isEscapeKey(evt) && !activeElement()) {
    onButtonFormCloseClick();
  }
};

const showUploadingMessage = (notificationMessage) => {
  document.body.appendChild(notificationMessage);
  notificationMesageElement = notificationMessage;
  document.addEventListener('click', onCloseNotification);
  document.addEventListener('keydown', onCloseNotification);
  if (notificationMesageElement.className.includes('success')) {
    onButtonFormCloseClick();
  } else if (notificationMesageElement.className.includes('error')){
    document.removeEventListener('keydown', onEscapeCloseForm);
  }
  return notificationMesageElement;
};

const addListeners = () => {
  newPicureCancelButton.addEventListener('click', onButtonFormCloseClick);
  document.addEventListener('keydown', onEscapeCloseForm);
  scaleControl.addEventListener('click', onButtonChangeScale);
};

const removeListeners = () => {
  document.removeEventListener('click', onCloseNotification);
  document.removeEventListener('keydown', onCloseNotification);
  newPictureForm.removeEventListener('submit', onSubmitForm);
};

const renderNewPictureForm = () => uploadFileButton.addEventListener('input', () => {
  openNewPictureForm();
  applyPictureEffect();
  checkNewPictureForm();
  renderNewImage();
  addListeners();
});

export {renderNewPictureForm, onButtonFormCloseClick, onEscapeCloseForm, removeListeners, showUploadingMessage};
