const formUpload = document.querySelector('.img-upload__form');

const textHashtags = document.querySelector('.text__hashtags');

const textDescription = document.querySelector('.text__description');

const pristine = new Pristine (formUpload, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper'
});

pristine.addValidator(textHashtags, (value) => {
  if (!value.trim()) {
    return true;
  }
  const hashtags = value.trim().split(/\s+/);
  return hashtags.length <= 5;
}, 'Не более 5 хэштегов', 1, false);

pristine.addValidator(textHashtags, (value) => {
  if (!value.trim()) {
    return true;
  }
  const hashtags = value.trim().split(/\s+/).filter(Boolean);
  return hashtags.every((hashtag) => hashtag !== '#' && hashtag !== '');
}, 'Каждый хэштег должен начинаться с символа #', 2, false);

pristine.addValidator(textHashtags, (value) => {
  if (!value.trim()) {
    return true;
  }
  const hashtags = value.trim().split(/\s+/);
  return hashtags.every((hashtag) => hashtag !== '#');
}, 'Хештег не может состоять только из одной решётки', 3, false);

pristine.addValidator(textHashtags, (value) => {
  if (!value.trim()) {
    return true;
  }
  const hashtags = value.trim().split(/\s+/);
  return hashtags.every((hashtag) => hashtag.length <= 20);
}, 'Максимальная длина одного хэштега 20 символов, включая решётку', 4, false);

pristine.addValidator(textHashtags, (value) => {
  if (!value.trim()) {
    return true;
  }
  const hashtags = value.trim().split(/\s+/);
  return hashtags.every((hashtag) => /^#[a-zа-яё0-9]{1,19}$/i.test(hashtag));
}, 'Строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.', 5, false);

pristine.addValidator(textHashtags, (value) => {
  if (!value.trim()) {
    return true;
  }
  const hashtags = value.trim().split(/\s+/);
  const uniqueHashtags = new Set(hashtags.map((h) => h.toLowerCase()));
  return uniqueHashtags.size === hashtags.length;
}, 'Один и тот же хэштег не может быть использован дважды', 6, false);

pristine.addValidator(textDescription, (value) => value.length <= 140, 'Длина комментария не может превышать 140 символов', 1, false);

const validateForm = () => {
  // Сбрасываем перед проверкой
  pristine.reset();
  const errorElements = document.querySelectorAll('.pristine-error');
  errorElements.forEach((element) => element.remove());
  return pristine.validate();
};

export {textHashtags, textDescription, formUpload, validateForm, pristine };
