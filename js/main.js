import {renderAllPictures} from './thumbnails.js';
import {renderFullPicture} from './full_picture.js';
import {renderNewPictureForm} from './new_picture_form.js';
import {getData} from './api.js';
import {showAllert} from './utils.js';

renderNewPictureForm ();

getData ()
  .then((pictures) => {
    renderAllPictures(pictures);
    renderFullPicture (pictures);
  })
  .catch(
    (error) => {
      showAllert(error.message);
    }
  );
