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
  newPicturePreview.className = `img-upload__preview effects__preview--${evt.target.value}`;
};

const applyPictureEffect = () => effectsContainer.addEventListener('change', (evt) => {
  evt.preventDefault();

  onButtonApllyEffect (evt);
});

export {applyPictureEffect, changeEffectValue};
