import {openModal} from './big-picture.js';
import {isEnterKey, setRandomArray} from './util.js';

const pictureList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const filtersForm = document.querySelector('.img-filters__form');
const filtersButtons = filtersForm.querySelectorAll('.img-filters__button');

const comparePictures = (pictures) => {
  const currentFilter = document.querySelector('.img-filters__button--active');
  if (currentFilter.id === 'filter-random') {
    return setRandomArray(pictures.slice()).slice(0, 10);
  }
  if (currentFilter.id === 'filter-discussed') {
    return pictures.slice().sort((a, b) => b.comments.length - a.comments.length);
  }
  return pictures;
};

const cleanPictures = () => {
  const oldPictures = pictureList.querySelectorAll('.picture');
  oldPictures.forEach((oldPicture) => oldPicture.remove());
};

const renderPictures = (pictures) => {
  const pictureListFragment = document.createDocumentFragment();

  comparePictures(pictures).forEach(({url, description, likes, comments}) => {
    const picture = pictureTemplate.cloneNode(true);
    picture.querySelector('.picture__img').src = url;
    picture.querySelector('.picture__img').alt = description;
    picture.querySelector('.picture__comments').textContent = comments.length;
    picture.querySelector('.picture__likes').textContent = likes;
    pictureListFragment.append(picture);

    picture.addEventListener('click', () => {
      openModal({url, description, likes, comments});
    });

    picture.addEventListener('keydown', (evt) => {
      if (isEnterKey(evt)) {
        openModal({url, description, likes, comments});
      }
    });
  });

  cleanPictures();
  pictureList.append(pictureListFragment);
};

const useFilter = (fn) => {
  const activeFilterClass = 'img-filters__button--active';
  for (const filtersButton of filtersButtons) {
    filtersButton.addEventListener('click', () => {
      document.querySelector(`.${activeFilterClass}`).classList.remove(activeFilterClass);
      filtersButton.classList.add(activeFilterClass);
      fn();
    });
  }
};

export {renderPictures, useFilter};
