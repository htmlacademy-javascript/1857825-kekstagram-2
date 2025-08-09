import {
  getRandomInteger,
  generateCounterId,
  createRandomIdFromRangeGenerator
} from './utils.js';
import { getDataArrayMiniatures } from './data.js';

const MIN_LIKES = 15;

const MAX_LIKES = 200;

const MIN_COMMENTS = 0;

const MAX_COMMENTS = 30;

const { MESSAGES, USER_NAMES, PHOTO_DESCRIPTIONS } = getDataArrayMiniatures();

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
    description: PHOTO_DESCRIPTIONS[id - 1],
    likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
    comments: Array.from({length:getRandomInteger(MIN_COMMENTS, MAX_COMMENTS)}, createComment)
  };
};

const createArrayPhotoDescriptions = (count) => Array.from({length: count}, createPhotoDescription);

export {createArrayPhotoDescriptions};
