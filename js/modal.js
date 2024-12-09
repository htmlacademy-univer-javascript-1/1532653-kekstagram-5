import {isEscapeKey, isEnterKey} from './util.js';

let modal = document.querySelector('.big-picture');
let modalClose = modal.querySelector('.big-picture__cancel');

let commentsList = document.querySelector('.social__comments');
let commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
let commentsListFragment = document.createDocumentFragment();

function createdComments(comments) {
  comments.forEach(({avatar, message, name}) => {
    let createdComment = commentTemplate.cloneNode(true);
    createdComment.querySelector('.social__picture').src = avatar;
    createdComment.querySelector('.social__picture').alt = name;
    createdComment.querySelector('.social__text').textContent = message;
    commentsListFragment.appendChild(createdComment);
  });

  commentsList.appendChild(commentsListFragment);
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

function openModal({url, description, likes, comments}) {
  modal.querySelector('.big-picture__img img').src = url;
  modal.querySelector('.likes-count').textContent = likes;
  modal.querySelector('.comments-count').textContent = comments.length;
  modal.querySelector('.social__caption').textContent = description;
  createdComments(comments);

  modal.querySelector('.social__comment-count').classList.add('hidden');
  modal.querySelector('.comments-loader').classList.add('hidden');
  document.body.classList.add('modal-open');
  modal.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
};

function closeModal() {
  modal.classList.add('hidden');
  modalClose.removeEventListener('click', onDocumentKeydown);
  document.body.classList.remove('modal-open');
  modal.querySelector('.social__comment-count').classList.remove('hidden');
  modal.querySelector('.comments-loader').classList.remove('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
};

modalClose.addEventListener('click', () => {
  closeModal();
});

modalClose.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    closeModal();
  }
});

export {openModal};
