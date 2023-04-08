import {pictureEffects} from './data.js';

const effectsContainer = document.querySelector('.img-upload')
  .querySelector('.effects');
const newPicturePreview = document.querySelector('.img-upload')
  .querySelector('.img-upload__preview')
  .querySelector('img');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const sliderElement = sliderContainer.querySelector('.effect-level__slider');
const effectValue = sliderContainer.querySelector('.effect-level__value');
let actualEffect = 'none';

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 80,
  step: 1,
  connect: 'lower'
});

const updateSlider = (evt) => {
  const actualEffectSettings = pictureEffects[evt.target.value.toUpperCase()];
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: actualEffectSettings.min,
      max: actualEffectSettings.max
    },
    step: actualEffectSettings.step,
    start: actualEffectSettings.max,
  });

  if (evt.target.value === 'none') {
    sliderContainer.classList.add('hidden');
  } else {
    sliderContainer.classList.remove('hidden');
  }
};

const onEffectSliderUpdate = () => {
  const sliderValue = sliderElement.noUiSlider.get();
  effectValue.value = sliderValue;
  newPicturePreview.style.filter = actualEffect === 'none' ?
    pictureEffects[actualEffect.toUpperCase()].style :
    `${pictureEffects[actualEffect.toUpperCase()].style}(${sliderValue}${pictureEffects[actualEffect.toUpperCase()].unit})`;
};

sliderElement.noUiSlider.on('update', onEffectSliderUpdate);

const onButtonApllyEffect = (evt) => {
  newPicturePreview.className = `effects__preview--${evt.target.value}`;
  actualEffect = evt.target.value;
  updateSlider (evt);
};

const applyPictureEffect = () => effectsContainer.addEventListener('change', onButtonApllyEffect);
const deletePictureEffect = () => effectsContainer.removeEventListener('change', onButtonApllyEffect);

export {applyPictureEffect, deletePictureEffect };
