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

const PICTURE_EFFECTS_TYPES = {
  'effect-chrome': 'effects__preview--chrome', 'effect-sepia': 'effects__preview--sepia',
  'effect-marvin': 'effects__preview--marvin', 'effect-phobos': 'effects__preview--phobos',
  'effect-heat': 'effects__preview--heat'
};

const BORDER_NUMBER = 25;
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
export {photoObjects, PICTURE_EFFECTS_TYPES};
