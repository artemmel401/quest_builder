export function isTimeCorrect(val) {
  const [hoursStr, minutesStr, secondsStr] = val.split(':');
  const regexp = /^\d{0,2}?\:?\d{0,2}?\:?\d{0,2}$/;
  //const regexp = /^\d{0,2}?\:?\d{0,2}?\:?\d{0,2}$/;     /^\d{0,2}?\:?\d{0,2}$/;
  if (!regexp.test(val)) {
      return false;
  }

  //console.log(hoursStr, minutesStr,secondsStr);
  const hours = Number(hoursStr);
  const minutes = Number(minutesStr);
  const seconds = Number(secondsStr);
  const isValidHour = (hour) => Number.isInteger(hour) && hour >= 0 && hour < 24;
  const isValidMinutes = (minutes) => (Number.isInteger(minutes) && minutes >= 0 && minutes < 60) || Number.isNaN(minutes);
  const isValidSeconds = (seconds) => (Number.isInteger(seconds) && seconds >= 0 && seconds < 60) || Number.isNaN(seconds);
  if (!isValidHour(hours) || !isValidMinutes(minutes) || !isValidSeconds(seconds)) {
      return false;
  }
  if (minutes < 10 && Number(minutesStr[0]) > 5) {
      return false;
  }
  if (seconds < 10 && Number(secondsStr[0]) > 5) {
      return false;
  }
  /*const valArr = val.indexOf(':') !== -1
      ? val.split(':')
      : [val];

  // check mm and HH
  if (valArr[0] && valArr[0].length && (parseInt(valArr[0], 10) < 0 || parseInt(valArr[0], 10) > 23)) {
      return false;
  }

  if (valArr[1] && valArr[1].length && (parseInt(valArr[1], 10) < 0 || parseInt(valArr[1], 10) > 59)) {
      return false;
  }*/

  return true;
}