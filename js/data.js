import {createIdGenerator, createRandomIdFromGenerator, generateRandomNumber} from './utils.js';

const DESCRIPTIONS = ['Я', 'Он', 'Отвратительный вид', 'Плохой друг', 'Какой-то челик', 'Закат', 'Тонущий корабль', 'Все кто меня бесят',
  'Кучка гавнюков!!!!', 'Клёвый кот', 'Здесь лежит труп', 'Мои гразные носки'];

const MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

const NAMES = ['Боб', 'Уолтер', 'Джесси', 'Памела', 'Ребека', 'Сьюзан', 'Рекс', 'Ким Чен Ын', 'Абу', 'Чендлер', 'Моника',
  'Росс', 'Фиби', 'Сол Гудман', 'Амояк', 'Боб младший', 'Джесика', 'Леонардо', 'Томас', 'Крокет', 'Бони', 'Клайд', 'Пушок', 'Кекс', 'Олег'];

const BORDER_NUMBER = 25;
const MAX_COMMENT_LENGTH = 140;
const SCALE_CHANGING_STEP = 25;
const SCALE_VALUE_UP = 'Увеличить';
const SCALE_VALUE_DOWN = 'Уменьшить';
const SCALE_MAX_VALUE = 100;
const SCALE_MIN_VALUE = 25;
const MAX_HASHTAGS_QUANTITY = 5;
const REG_EXP_HASHTAG = /^#[a-zA-Zа-яА-Яё0-9]{1,19}$/;
const ERROR_MESSAGE_HASHTAGS_LENGTH = '<br>Кол-во хештегов не более 5';
const ERROR_MESSAGE_HASHTAGS_CORRECT = '<br> - Хештег должен начинается c символа #;<br> - Максимальная длина хештега 19 символов;<br> - Хештег может состоять только из цифр и букв';
const ERROR_MESSAGE_HASHTAGS_UNIQUE = '<br>Каждый хештег должен быть уникален (регистр не имеет значения)';
const ERROR_MESSAGE_COMMENT_CORRECT = '<br>Комментарий не должен состоять из более чем 140 символов';
const PICTURE_EFFECTS = {
  'none': {
    style: 'none',
    min: 0,
    max: 0,
    step: 0,
    unit: '',
  },
  'chrome': {
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  'sepia': {
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  'marvin': {
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  'phobos': {
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  'heat': {
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  }
};

const getPhotoId = createRandomIdFromGenerator(1, BORDER_NUMBER);
const getPhotoUrl = createRandomIdFromGenerator(1, BORDER_NUMBER);
const getCommentId = createIdGenerator();
const createRandomComment = () => ({
  id: getCommentId(),
  avatar: `img/avatar-${generateRandomNumber(1, 6)}.svg`,
  message: MESSAGES[generateRandomNumber(0, MESSAGES.length - 1)],
  name: NAMES[generateRandomNumber(0, NAMES.length - 1)]
});
const createRandomComments = () => Array.from({length: generateRandomNumber(1, 10)}, createRandomComment);


const createPhotoObject = () => ({
  id: getPhotoId(),
  url: `photos/${getPhotoUrl()}.jpg`,
  description: DESCRIPTIONS[generateRandomNumber(0, DESCRIPTIONS.length - 1)],
  likes: generateRandomNumber(15, 200),
  comments: createRandomComments()
});

const createPhotoObjects = () => Array.from({length: BORDER_NUMBER}, createPhotoObject);
const photoObjects = createPhotoObjects();
export {photoObjects, MAX_COMMENT_LENGTH, SCALE_MAX_VALUE, SCALE_MIN_VALUE, SCALE_CHANGING_STEP,
  SCALE_VALUE_DOWN, SCALE_VALUE_UP, MAX_HASHTAGS_QUANTITY, REG_EXP_HASHTAG,
  ERROR_MESSAGE_COMMENT_CORRECT, ERROR_MESSAGE_HASHTAGS_CORRECT, ERROR_MESSAGE_HASHTAGS_LENGTH,
  ERROR_MESSAGE_HASHTAGS_UNIQUE, PICTURE_EFFECTS};
