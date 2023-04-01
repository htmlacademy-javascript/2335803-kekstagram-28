import {MAX_COMMENT_LENGTH, MAX_HASHTAGS_QUANTITY, REG_EXP_HASHTAG,
  ERROR_MESSAGE_COMMENT_CORRECT, ERROR_MESSAGE_HASHTAGS_CORRECT, ERROR_MESSAGE_HASHTAGS_LENGTH,
  ERROR_MESSAGE_HASHTAGS_UNIQUE} from './data.js';
import {sendData} from './api.js';
import {onButtonCloseClick} from './new_picture_form.js';
import {isEscapeKey} from './utils.js';

const newPictureForm = document.querySelector('.img-upload__form');
const uploadButton = newPictureForm.querySelector('.img-upload__submit');
const loadingMessageTemplate = document.querySelector('#messages')
  .content
  .querySelector('.img-upload__message');
const successUploadingMessage = document.querySelector('#success')
  .content
  .querySelector('.success');
const errorUploadingMessage = document.querySelector('#error')
  .content
  .querySelector('.error');
let notificationMesageElement;

const pristine = new Pristine (newPictureForm, {
  classTo: 'form__item',
  errorClass: 'form__tem--invalid',
  successClass: 'form__item--valid',
  errorTextParent: 'form__item',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
}, false);

newPictureForm.addEventListener('focusin', () => {
  pristine.reset();
});

newPictureForm.addEventListener('focusout', () => {
  pristine.reset();
});

const blockSubmitButton = (buttonState) => {
  uploadButton.disabled = buttonState;
  if (buttonState) {
    document.body.appendChild(loadingMessageTemplate);
  } else {
    loadingMessageTemplate.parentNode.removeChild(loadingMessageTemplate);
  }
};

const onCloseNotification = (evt) => {
  if (isEscapeKey(evt) || evt.target.className.includes('success' || 'error')) {
    notificationMesageElement.parentNode.removeChild(notificationMesageElement);
    document.removeEventListener('click', onCloseNotification);
    document.removeEventListener('keydown', onCloseNotification);
  }
};

const showUploadingMessage = (notificationMessage) => {
  document.body.appendChild(notificationMessage);
  notificationMesageElement = notificationMessage;
  document.addEventListener('click', onCloseNotification);
  document.addEventListener('keydown', onCloseNotification);
  if (notificationMesageElement.className === 'success') {
    onButtonCloseClick();
  }
};

const onSubmitForm = (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    blockSubmitButton (true);
    sendData(new FormData(evt.target))
      .then((response) => {
        if (response) {
          showUploadingMessage (successUploadingMessage);
        }
      })
      .catch(
        () => {
          showUploadingMessage (errorUploadingMessage);
        }
      )
      .finally(blockSubmitButton (false));
  }
};

const validateHashtagsLength = (value) => value.split(' ').length < MAX_HASHTAGS_QUANTITY;
const validateHashtagsCorrect = (value) => value.split(' ').every((tag) => tag.match(REG_EXP_HASHTAG)) || !value;
const validateHashtagsUnique = (value) => {
  const tagList = value.split(' ');
  const repliedTagList = new Set(tagList.map((tag) => tag.toLowerCase()));
  return Array.from(repliedTagList).length === tagList.length;
};

const validateComentCorrect = (value) => value.length <= MAX_COMMENT_LENGTH;

pristine.addValidator(newPictureForm.querySelector('#hashtags'), validateHashtagsLength, ERROR_MESSAGE_HASHTAGS_LENGTH, 1, true);
pristine.addValidator(newPictureForm.querySelector('#hashtags'), validateHashtagsCorrect, ERROR_MESSAGE_HASHTAGS_CORRECT, 2, true);
pristine.addValidator(newPictureForm.querySelector('#hashtags'), validateHashtagsUnique, ERROR_MESSAGE_HASHTAGS_UNIQUE, 3, true);
pristine.addValidator(newPictureForm.querySelector('#description'), validateComentCorrect, ERROR_MESSAGE_COMMENT_CORRECT, 4, true);

const checkNewPictureForm = () => newPictureForm.addEventListener('submit', (evt) => {
  onSubmitForm (evt);
});

export {checkNewPictureForm};
