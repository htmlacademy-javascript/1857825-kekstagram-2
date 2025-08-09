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

export {getRandomInteger, generateCounterId, createRandomIdFromRangeGenerator};
