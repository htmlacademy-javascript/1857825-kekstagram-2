const MESSAGES = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

const USER_NAMES = ['Иван' , 'Петр', 'Милана', 'Глеб', 'Виктория', 'Платон', 'Елена',];

const PHOTO_DESCRIPTION = ['Гостиница', 'Дорога к пляжу', 'Море', 'Девушка', 'Суп', 'Машина', 'Клубника', 'Компот', 'Самолет', 'Обувь', 'Забор', 'Ауди', 'Салат', 'Котик', 'Уги', 'Небо', 'Хор', 'ОлдМобиль', 'Тапочки', 'Пальмы', 'Тайская Еда', 'Закат', 'Краб', 'Концерт', 'Сафари'];

const MIN_LIKES = 15;

const MAX_LIKES = 200;

const MIN_COMMENTS = 0;

const MAX_COMMENTS = 30;

const getRandomInteger = (minNumber, maxNumber)=> {
  const lower = Math.ceil(Math.min(minNumber, maxNumber));
  const upper = Math.floor(Math.max(minNumber, maxNumber));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const generateCounterId = ()=> {
  let count = 0;
  return function () {
    count += 1;
    return count;
  };
};

const createRandomIdFromRangeGenerator = (min, max)=> {
  const previousValues = [];
  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const getCounterId = generateCounterId();

const createComment = () => {
  const randomMessageIndex = getRandomInteger(0, MESSAGES.length - 1);
  const randomNameIndex = getRandomInteger(0, USER_NAMES.length - 1);
  const getRandomId = createRandomIdFromRangeGenerator(0, 1000);
  return {
    id: getRandomId(),
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: MESSAGES[randomMessageIndex],
    name: USER_NAMES[randomNameIndex]
  };
};

const createPhotoDescription = ()=> {
  const id = getCounterId();
  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: PHOTO_DESCRIPTION[id - 1],
    likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
    comments: Array.from({length:getRandomInteger(MIN_COMMENTS, MAX_COMMENTS)}, createComment)
  };
};

const arrayPhotoDescriptions = Array.from({length: 25}, createPhotoDescription);

export default arrayPhotoDescriptions; //Пока экспорт только, для того чтобы  не было ошибки
