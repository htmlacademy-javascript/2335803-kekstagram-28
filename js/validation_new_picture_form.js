import {MAX_COMMENT_LENGTH, MAX_HASHTAGS_QUANTITY, REG_EXP_HASHTAG,
  ERROR_MESSAGE_COMMENT_CORRECT, ERROR_MESSAGE_HASHTAGS_CORRECT, ERROR_MESSAGE_HASHTAGS_LENGTH,
  ERROR_MESSAGE_HASHTAGS_UNIQUE} from './data.js';

const newPictureForm = document.querySelector('.img-upload__form');

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

const onSubmitForm = (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    newPictureForm.submit();
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
