const MAX_COMMENT_LENGTH = 140;
const SCALE_CHANGING_STEP = 25;
const SCALE_VALUE_UP = 'Увеличить';
const SCALE_VALUE_DOWN = 'Уменьшить';
const SCALE_MAX_VALUE = 100;
const SCALE_MIN_VALUE = 25;
const MAX_HASHTAGS_QUANTITY = 5;
const REG_EXP_HASHTAG = /^#[a-zA-Zа-яА-Яё0-9]{1,19}$/;
const LIMIT_RENDER_COMMENTS = 5;
const ERROR_MESSAGE_HASHTAGS_LENGTH = '<br>Кол-во хештегов не более 5';
const ERROR_MESSAGE_HASHTAGS_CORRECT = '<br> - Хештег должен начинается c символа #;<br> - Максимальная длина хештега 19 символов;<br> - Хештег может состоять только из цифр и букв';
const ERROR_MESSAGE_HASHTAGS_UNIQUE = '<br>Каждый хештег должен быть уникален (регистр не имеет значения)';
const ERROR_MESSAGE_COMMENT_CORRECT = '<br>Комментарий не должен состоять из более чем 140 символов';
const pictureEffects = {
  'NONE': {
    style: 'none',
    min: 0,
    max: 0,
    step: 0,
    unit: '',
  },
  'CHROME': {
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  'SEPIA': {
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  'MARVIN': {
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  'PHOBOS': {
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  'HEAT': {
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  }
};

const BASE_URL = 'https://28.javascript.pages.academy/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};
const Method = {
  GET: 'GET',
  POST: 'POST',
};
const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить странницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте отправить снова',
};

const DEBOUNCE_TIME_INTERVAL = 500;
const RANDOM_PICTURES_FILTER_COUNT = 10;
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

export {MAX_COMMENT_LENGTH, SCALE_MAX_VALUE, SCALE_MIN_VALUE, SCALE_CHANGING_STEP,
  SCALE_VALUE_DOWN, SCALE_VALUE_UP, MAX_HASHTAGS_QUANTITY, REG_EXP_HASHTAG,
  ERROR_MESSAGE_COMMENT_CORRECT, ERROR_MESSAGE_HASHTAGS_CORRECT, ERROR_MESSAGE_HASHTAGS_LENGTH,
  ERROR_MESSAGE_HASHTAGS_UNIQUE, pictureEffects, BASE_URL, Method, Route, ErrorText, LIMIT_RENDER_COMMENTS,
  DEBOUNCE_TIME_INTERVAL, RANDOM_PICTURES_FILTER_COUNT, FILE_TYPES};
