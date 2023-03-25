import {photoObjects} from './data.js';
import {renderAllPictures} from './thumbnails.js';
import {renderFullPicture} from './full_picture.js';
import {renderNewPictureForm} from './new_picture_form.js';

renderAllPictures (photoObjects);
renderFullPicture (photoObjects);
renderNewPictureForm ();
