import {generatedData} from './data.js';
import {openModal} from './modal.js';

let pictureList = document.querySelector('.pictures');
let pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
let generatedPictures = generatedData();
let pictureListFragment = document.createDocumentFragment();

generatedPictures.forEach(({url, description, likes, comments}) => {
  let generatedPicture = pictureTemplate.cloneNode(true);
  generatedPicture.querySelector('.picture__img').src = url;
  generatedPicture.querySelector('.picture__img').alt = description;
  generatedPicture.querySelector('.picture__comments').textContent = comments.length;
  generatedPicture.querySelector('.picture__likes').textContent = likes;
  pictureListFragment.appendChild(generatedPicture);

  generatedPicture.addEventListener('click', () => {
    openModal({url, description, likes, comments});
  });

  generatedPicture.addEventListener('keydown', (evt) => {
    if (isEnterKey(evt)) {
      openModal({url, description, likes, comments});
    }
  });
});

pictureList.appendChild(pictureListFragment);
