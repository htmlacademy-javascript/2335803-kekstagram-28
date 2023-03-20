import {photoObjects} from './data.js';
import {renderAllPictures} from './thumbnails.js';
import {renderFullPicture, hideFullPicture} from './full_picture.js';

renderAllPictures (photoObjects);
renderFullPicture (photoObjects);
hideFullPicture ();
