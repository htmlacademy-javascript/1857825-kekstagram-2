const checkStringLength = (string, length) => string.length <= length;
checkStringLength('tGtnz', 5);
/*console.log(checkStringLength('tGrz', 5));*/

const checkIsPalindrom = (string = '') => {
  const changedString = string.toLowerCase().replaceAll(' ', '');
  return changedString === [...changedString].reverse().join('');
};
checkIsPalindrom('топота');
/*console.log(checkIsPalindrom('топота'));*/

const getCeilNumber = (data) => {
  const string = String(data);
  let ceilNumber = '';
  for (let i = 0; i < string.length; i++) {
    if (!isNaN(string[i])) {
      ceilNumber += string[i];
    }
  }
  if (ceilNumber) {
    return ceilNumber;
  }
  return NaN;
};
getCeilNumber('54iop68');
/*console.log(getCeilNumber(-7));*/
