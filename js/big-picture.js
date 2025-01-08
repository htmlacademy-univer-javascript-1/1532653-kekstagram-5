import {isEscapeKey, isEnterKey} from './util.js';

const modal = document.querySelector('.big-picture');
const modalCloseButton = modal.querySelector('.big-picture__cancel');

const commentsList = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const commentsListFragment = document.createDocumentFragment();

function createdComments(comments) {
  comments.forEach(({avatar, message, name}) => {
    const createdComment = commentTemplate.cloneNode(true);
    createdComment.querySelector('.social__picture').src = avatar;
    createdComment.querySelector('.social__picture').alt = name;
    createdComment.querySelector('.social__text').textContent = message;
    commentsListFragment.append(createdComment);
  });

  commentsList.append(commentsListFragment);
}

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
}

function closeModal() {
  modal.classList.add('hidden');
  modalCloseButton.removeEventListener('click', onDocumentKeydown);
  document.body.classList.remove('modal-open');
  modal.querySelector('.social__comment-count').classList.remove('hidden');
  modal.querySelector('.comments-loader').classList.remove('hidden');
  commentsList.innerHTML = '';
  document.removeEventListener('keydown', onDocumentKeydown);
}

modalCloseButton.addEventListener('click', () => {
  closeModal();
});

modalCloseButton.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    closeModal();
  }
});

export {openModal};
