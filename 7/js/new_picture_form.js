import {isEscapeKey} from './utils.js';
import {checkNewPictureForm} from './validation_new_picture_form.js';
import {applyPictureEffect, changeEffectValue} from './new_picture_effects.js';
import {SCALE_MAX_VALUE, SCALE_VALUE_DOWN, SCALE_MIN_VALUE, SCALE_VALUE_UP} from './data.js';

const newPictureUpload = document.querySelector('.img-upload');
const effectNone = newPictureUpload.querySelector('#effect-none');
const uploadFileButton = newPictureUpload.querySelector('#upload-file');
const newPictureWindow = newPictureUpload.querySelector('.img-upload__overlay');
const newPicureCancelButton = newPictureUpload.querySelector('.img-upload__cancel');
const scaleControl = newPictureUpload.querySelector('.img-upload__scale');
const newPicturePreview = newPictureUpload.querySelector('.img-upload__preview');
const scaleControlValue = scaleControl.querySelector('.scale__control--value');


const openNewPictureForm = () => {
  newPictureWindow.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
};

const onButtonCloseClick = () => {
  document.querySelector('body').classList.remove('modal-open');
  newPictureWindow.classList.add('hidden');
  newPicturePreview.classList.value = 'img-upload__preview';
  scaleControlValue.value = '100%';
  effectNone.checked = true;
};

const hideNewPictureForm = () => newPicureCancelButton.addEventListener('click', onButtonCloseClick);
document.addEventListener('keydown', (evt) => {
  const activeElement = () => document.activeElement.id === 'description' || document.activeElement.id === 'hashtags';
  if (isEscapeKey(evt) && !activeElement()) {
    onButtonCloseClick();
  }
});

const onButtonChangeScale = (evt) => {
  const previousScaleValue = parseInt(scaleControlValue.value.match(/\d+/), 10);
  let newScaleValue;

  if ((previousScaleValue === SCALE_MIN_VALUE && evt.target.textContent === SCALE_VALUE_DOWN) ||
  (previousScaleValue === SCALE_MAX_VALUE && evt.target.textContent === SCALE_VALUE_UP)) {
    return;
  }
  switch (evt.target.textContent) {
    case 'Увеличить':
      newScaleValue = previousScaleValue + 25;
      break;
    case 'Уменьшить':
      newScaleValue = previousScaleValue - 25;
      break;
    default:
      return;
  }
  newPicturePreview.style.transform = `scale(${newScaleValue / 100})`;
  scaleControlValue.value = `${newScaleValue}%`;
};


const changeNewPictureScale = () => scaleControl.addEventListener('click', (evt) => {
  onButtonChangeScale (evt);
});

const renderNewPictureForm = () => uploadFileButton.addEventListener('input', () => {
  openNewPictureForm();
  changeNewPictureScale ();
  applyPictureEffect ();
  hideNewPictureForm();
  checkNewPictureForm ();
  changeEffectValue ();
});

export {renderNewPictureForm};
