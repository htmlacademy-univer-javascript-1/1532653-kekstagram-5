import {isEscapeKey, isEnterKey, showErrorAlert, debounce} from './util.js';
import {resetScaleControlValue, setScaleEffect, setFilterEffects} from './effects.js';
import {sendData} from './api.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadModal = document.querySelector('.img-upload__overlay');
const uploadControl = uploadForm.querySelector('.img-upload__input');
const uploadPreview = uploadForm.querySelector('.img-upload__preview img');
const uploadCloseButton = uploadForm.querySelector('.img-upload__cancel');
const uploadHashtags = uploadForm.querySelector('.text__hashtags');
const uploadComment = uploadForm.querySelector('.text__description');
const uploadSubmitButton = uploadForm.querySelector('.img-upload__submit');
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && evt.target !== uploadHashtags && evt.target !== uploadComment) {
    evt.preventDefault();
    closeUploadForm();
  }
};

function openUploadForm() {
  document.body.classList.add('modal-open');
  uploadModal.classList.remove('hidden');
  setScaleEffect();
  setFilterEffects();
  document.addEventListener('keydown', onDocumentKeydown);
}

function closeUploadForm() {
  uploadModal.classList.add('hidden');
  uploadCloseButton.removeEventListener('click', onDocumentKeydown);
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadForm.reset();
  resetScaleControlValue();
}

uploadControl.onchange = () => {
  const file = uploadControl.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    uploadPreview.src = URL.createObjectURL(file);
    openUploadForm();
  } else {
    showErrorAlert('Не удалось открыть изображение. Попробуйте ещё раз.');
  }
};

uploadCloseButton.addEventListener('click', () => {
  closeUploadForm();
});

uploadCloseButton.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    closeUploadForm();
  }
});

const pristine = new Pristine(uploadForm);

let closeMessageButton;

const outOfMessage = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (document.querySelector('.success')) {
      hideFormMessage('success');
    } else if (document.querySelector('.error')) {
      hideFormMessage('error');
    }
  } else if (evt.target.classList.contains('success') || evt.target.classList.contains('error')) {
    hideFormMessage(evt.target.classList.contains('success') ? 'success' : 'error');
  }
};

function showFormMessage(result) {
  const formMessageTemplate = document.querySelector(`#${result}`).content.querySelector(`.${result}`);
  document.body.append(formMessageTemplate.cloneNode(true));
  closeMessageButton = document.querySelector(`.${result}__button`);
  document.addEventListener('keydown', outOfMessage);
  document.addEventListener('click', outOfMessage);
  closeMessageButton.addEventListener('click', () => hideFormMessage(result));
}

function hideFormMessage(result) {
  document.querySelector(`.${result}`).remove();
  document.removeEventListener('keydown', outOfMessage);
  document.removeEventListener('click', outOfMessage);
  closeMessageButton.removeEventListener('click', () => hideFormMessage(result));
}

const hashtagsRules = {
  MAX_COUNT: 'Количество хэш-тегов больше пяти',
  INVALID_HASHTAG: 'Введён невалидный хэш-тег',
  NO_REPEAT: 'Один и тот же хэш-тег не может быть использован дважды'
};

let hashtagsError;

const validateHashtags = (value) => {
  value = value.trim().toLowerCase();
  const hashtags = value.split(' ');
  const validHashtag = /^#[a-zа-яё0-9]{1,19}$/i;
  const checkHashtags = hashtags.every((hashtag) => validHashtag.test(hashtag));
  const duplicatesHashtag = new Set(hashtags).size === hashtags.length;

  if (hashtags[0] !== '') {
    if (hashtags.length > 5) {
      hashtagsError = hashtagsRules.MAX_COUNT;
      return false;
    }
    if (!checkHashtags) {
      hashtagsError = hashtagsRules.INVALID_HASHTAG;
      return false;
    }
    if (!duplicatesHashtag) {
      hashtagsError = hashtagsRules.NO_REPEAT;
      return false;
    }
  }

  return true;
};

const getHashtagsErrorMessage = () => debounce(showErrorAlert(hashtagsError));

pristine.addValidator(uploadHashtags, validateHashtags, getHashtagsErrorMessage);

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    uploadSubmitButton.disabled = true;
    sendData(new FormData(evt.target))
      .then(() => {
        closeUploadForm();
        showFormMessage('success');
      })
      .catch(() => showFormMessage('error'))
      .finally(() => {
        uploadSubmitButton.disabled = false;
      });
  } else {
    showFormMessage('error');
  }
});
