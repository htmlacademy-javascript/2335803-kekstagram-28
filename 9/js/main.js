import {renderAllPictures} from './thumbnails.js';
import {renderFullPicture} from './full_picture.js';
import {renderNewPictureForm} from './new_picture_form.js';
import {getData} from './server_api.js';
import {showAllert} from './utils.js';
import {MAIN_PAGE_PICTURES_COUNT} from './data.js';

renderNewPictureForm ();

getData ()
  .then((pictures) => {
    renderAllPictures(pictures.slice(0, MAIN_PAGE_PICTURES_COUNT));
    renderFullPicture (pictures);
  })
  .catch(
    (error) => {
      showAllert(error.message);
    }
  );
