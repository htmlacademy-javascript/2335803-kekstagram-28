const generateNumber = (firstValue, secondValue) => {
  const lower = Math.min(firstValue, secondValue);
  const upper = Math.max(firstValue, secondValue);
  const result = Math.floor(Math.random() * (upper - lower + 1) + lower);
  return result;
};

const createRandomIdFromGenerator = (firstValue, secondValue) => {
  const previousValues = [];

  return function () {
    let newValue = generateNumber(firstValue, secondValue);
    if (previousValues.length >= (secondValue - firstValue + 1)) {
      return;
    }
    while (previousValues.includes(newValue)) {
      newValue = generateNumber(firstValue, secondValue);
    }
    previousValues.push(newValue);
    return newValue;
  };
};

const descriptions = ['Я', 'Он', 'Отвратительный вид', 'Плохой друг', 'Какой-то челик', 'Закат', 'Тонущий корабль', 'Все кто меня бесят',
  'Кучка гавнюков!!!!', 'Клёвый кот', 'Здесь лежит труп', 'Мои гразные носки'];

const messages = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

const names = ['Боб', 'Уолтер', 'Джесси', 'Памела', 'Ребека', 'Сьюзан', 'Рекс', 'Ким Чен Ын', 'Абу', 'Чендлер', 'Моника',
  'Росс', 'Фиби', 'Сол Гудман', 'Амояк', 'Боб младший', 'Джесика', 'Леонардо', 'Томас', 'Крокет', 'Бони', 'Клайд', 'Пушок', 'Кекс', 'Олег'];

const borderNumber = 25;
const getPhotoId = createRandomIdFromGenerator(1, borderNumber);
const getPhotoUrl = createRandomIdFromGenerator(1, borderNumber);
const getLikes = createRandomIdFromGenerator(15, 200);
const getCommentId = createRandomIdFromGenerator(0, 10000);
const getNameIndex = createRandomIdFromGenerator(0, names.length - 1);
const photos = [];

for (let i = 0; i < borderNumber; i ++) {
  const photoInfo = {
    id: getPhotoId(),
    url: `photos/${getPhotoUrl()}.jpg`,
    description: descriptions[generateNumber(0, descriptions.length - 1)],
    likes: getLikes(),
    comments: {
      id: getCommentId(),
      avatar: `img/avatar-${generateNumber(1, 6)}.svg`,
      message: messages[generateNumber(0, messages.length - 1)],
      name: names[getNameIndex()]
    }
  };
  photos.push(photoInfo);
}
