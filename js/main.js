import {renderPictures, useFilter} from './pictures.js';
import './form.js';
import {getData} from './api.js';
import {showErrorAlert, debounce} from './util.js';

getData()
  .then((pictures) => {
    renderPictures(pictures);
    useFilter(debounce(() => renderPictures(pictures)));
  })
  .then(() => document.querySelector('.img-filters').classList.remove('img-filters--inactive'))
  .catch((err) => showErrorAlert(err.message));
