import {renderAllPictures} from './thumbnails.js';
import {renderFullPicture} from './full_picture.js';
import {renderNewPictureForm} from './new_picture_form.js';
import {getData} from './api.js';
import {showAllert} from './utils.js';
import {renderPicturesFilters} from './pictures_filtration.js';

renderNewPictureForm ();

getData ()
  .then((pictures) => {
    renderAllPictures(pictures);
    renderPicturesFilters (pictures);
    renderFullPicture (pictures);
  })
  .catch(
    (error) => {
      showAllert(error.message);
    }
  );
