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

function checkDurationMeeting (startWork, endWork, startMeeting, durationMeeting) {
  const toMinutes = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const workStart = toMinutes(startWork);
  const workEnd = toMinutes(endWork);
  const meetingStart = toMinutes(startMeeting);
  const meetingEnd = meetingStart + durationMeeting;

  const workDuration = workEnd - workStart;
  return meetingStart >= workStart && meetingEnd <= workEnd && durationMeeting <= workDuration;
}
checkDurationMeeting('08:00', '17:30', '14:00', 90); // true
checkDurationMeeting('8:0', '10:0', '8:0', 120);// true
checkDurationMeeting('08:00', '14:30', '14:00', 90); // false
checkDurationMeeting('14:00', '17:30', '08:0', 90);// false
checkDurationMeeting('8:00', '17:30', '08:00', 900);// false

