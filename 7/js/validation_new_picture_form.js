import {MAX_COMMENT_LENGTH, MAX_HASHTAGS_QUANTITY} from './data.js';

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
const validateHashtagsCorrect = (value) => {
  const tagList = value.split(' ');
  const repliedTagList = new Set();
  if (!value) {
    return true;
  }
  for (let tag of tagList) {
    tag = tag.toLowerCase();
    const regExp = /^#[a-zа-яё0-9]{1,19}$/;
    if (!tag.match(regExp)) {
      return false;
    }
    repliedTagList.add(tag);
  }
  return Array.from(repliedTagList).length === tagList.length;
};

const validateComentCorrect = (value) => value.length <= MAX_COMMENT_LENGTH;

pristine.addValidator(newPictureForm.querySelector('#hashtags'), validateHashtagsLength, 'Кол-во хеш-тегов не более 5');
pristine.addValidator(newPictureForm.querySelector('#hashtags'), validateHashtagsCorrect, ' - Каждый хэштег должен начинается c символа #;\n - Хеш-теги не должны повторяться (регистр не имеет значения);\n - Максимальная длина хэш-тега 19 символов;\n - Хеш-тег может состоять только из цифр и букв');
pristine.addValidator(newPictureForm.querySelector('#description'), validateComentCorrect, 'Комментарий не должен состоять из более чем 140 символов');

const checkNewPictureForm = () => newPictureForm.addEventListener('submit', (evt) => {
  onSubmitForm (evt);
});

export {checkNewPictureForm};
