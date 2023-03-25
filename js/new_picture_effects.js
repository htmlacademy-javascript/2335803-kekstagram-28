import {PICTURE_EFFECTS_TYPES} from './data.js';

const effectsContainer = document.querySelector('.img-upload')
  .querySelector('.effects');
const newPicturePreview = document.querySelector('.img-upload')
  .querySelector('.img-upload__preview');
const sliderElement = document.querySelector('.effect-level__slider');
const effectValue = document.querySelector('.effect-level__value');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 80,
  step: 1,
  connect: 'lower'
});

const onEffectSliderUpdate = () => {
  effectValue.value = sliderElement.noUiSlider.get();
};

const changeEffectValue = () => {
  sliderElement.noUiSlider.on('update', onEffectSliderUpdate);
};

const onButtonApllyEffect = (evt) => {
  const effectType = evt.target.id;
  const allClasses = newPicturePreview.classList;
  for (const className of allClasses) {
    if (className.includes('effects__preview')) {
      newPicturePreview.classList.remove(className);
    }
  }
  newPicturePreview.classList.add(PICTURE_EFFECTS_TYPES[effectType]);
};

const applyPictureEffect = () => effectsContainer.addEventListener('change', (evt) => {
  onButtonApllyEffect (evt);
});

export {applyPictureEffect, changeEffectValue};
