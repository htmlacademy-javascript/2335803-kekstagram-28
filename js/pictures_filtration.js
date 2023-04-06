import {renderAllPictures} from './thumbnails.js';
import {createRandomIdFromGenerator, debounce} from './utils.js';
import {DEBOUNCE_TIME_INTERVAL, RANDOM_PICTURES_FILTER_COUNT} from './data.js';

const picturesFiltersContainer = document.querySelector('.img-filters');
const picturesFiltersForm = picturesFiltersContainer.querySelector('.img-filters__form');
const picturesContainer = document.querySelector('.pictures');
let arrayPictures;
let previousFilterButton = picturesFiltersContainer.querySelector('#filter-default');

const cleanAllThumbnails = () => {
  const allPictures = picturesContainer.querySelectorAll('.picture');
  allPictures.forEach((picture) => {
    picture.parentNode.removeChild(picture);
  });
};

const comparePictures = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;

const generateThumbnails = (evt) => {
  if (previousFilterButton.id !== evt.target.id) {
    previousFilterButton.className = 'img-filters__button';
    previousFilterButton = evt.target;
    evt.target.className = 'img-filters__button  img-filters__button--active';
  }

  cleanAllThumbnails ();
  switch (evt.target.id) {
    case 'filter-default': {
      renderAllPictures (arrayPictures);
      break;
    }
    case 'filter-random': {
      const randomArrayPictures = [];
      const randomId = createRandomIdFromGenerator(0, arrayPictures.length - 1);
      for (let i = 0; i < RANDOM_PICTURES_FILTER_COUNT; i ++) {
        randomArrayPictures.push(arrayPictures[randomId()]);
      }
      renderAllPictures (randomArrayPictures);
      break;
    }
    case 'filter-discussed': {
      renderAllPictures (arrayPictures
        .slice()
        .sort(comparePictures));
      break;
    }
  }
};

const onFilterButtonClick = (evt) => {
  if (evt.target.id) {
    const debounceDoRender = debounce(generateThumbnails, DEBOUNCE_TIME_INTERVAL);
    debounceDoRender(evt);
  }
};

const renderPicturesFilters = (pictures) => {
  arrayPictures = pictures.slice();
  picturesFiltersContainer.classList.remove('img-filters--inactive');
  picturesFiltersForm.addEventListener('click', onFilterButtonClick);
};

export {renderPicturesFilters};
