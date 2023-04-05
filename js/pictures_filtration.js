import {renderAllPictures} from './thumbnails.js';
import {createRandomIdFromGenerator, debounce} from './utils.js';

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

const onFilterButtonClick = (evt) => {
  const debounceDoRender = debounce(renderAllPictures, 500);

  if (previousFilterButton.id !== evt.target.id) {
    previousFilterButton.className = 'img-filters__button';
    previousFilterButton = evt.target;
    evt.target.className = 'img-filters__button  img-filters__button--active';
  }

  cleanAllThumbnails ();
  switch (evt.target.id) {
    case 'filter-default': {
      debounceDoRender (arrayPictures);
      break;
    }
    case 'filter-random': {
      const randomArrayPictures = [];
      const randomId = createRandomIdFromGenerator(0, arrayPictures.length - 1);
      for (let i = 0; i < 10; i ++) {
        randomArrayPictures.push(arrayPictures[randomId()]);
      }
      debounceDoRender(randomArrayPictures);
      break;
    }
    case 'filter-discussed': {
      debounceDoRender (arrayPictures
        .slice()
        .sort(comparePictures));
      break;
    }
  }
};

const renderPicturesFilters = (pictures) => {
  arrayPictures = pictures;
  picturesFiltersContainer.classList.remove('img-filters--inactive');
  picturesFiltersForm.addEventListener('click', onFilterButtonClick);
};

export {renderPicturesFilters};
