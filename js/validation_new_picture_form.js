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

const validateHashtagsLength = (value) => value.split(' ').length < 3;
const validateHashtagsCorrect = (value) => {
  const tagList = value.split(' ');
  const repliedTagList = [];
  if (!value) {
    return true;
  }
  for (let tag of tagList) {
    tag = tag.toLowerCase();
    if (!tag.match(/^#[a-zа-яё0-9]{1,19}$/)) {
      return false;
    } else if (repliedTagList.includes(tag)) {
      return false;
    }
    repliedTagList.push(tag);
  }
  return true;
};

const validateComentCorrect = (value) => value.length <= 140;

pristine.addValidator(newPictureForm.querySelector('#hashtags'), validateHashtagsLength, 'Кол-во хеш-тегов должно быть не более 5');
pristine.addValidator(newPictureForm.querySelector('#hashtags'), validateHashtagsCorrect, 'Каждый хэштег должен начинаться c символа #');
pristine.addValidator(newPictureForm.querySelector('#description'), validateComentCorrect, 'Комментарий не должен состоять из более чем 140 символов');

const checkNewPictureForm = () => newPictureForm.addEventListener('submit', (evt) => {
  onSubmitForm (evt);
});

export {checkNewPictureForm};
