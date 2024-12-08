import {generatedData} from './data.js';

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
});

pictureList.appendChild(pictureListFragment);
