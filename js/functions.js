// функция проверки длины строки
const checkLength = (txt, qnt) => txt.length > qnt;

// функция проверки слова на полиндром
function checkPolindrom (word) {
  const LIMIT = Math.trunc(word.length / 2);
  word = word.toLowerCase();
  word = word.replaceAll(' ', '');
  for (let i = 0; i < LIMIT; i ++) {
    if (word.at(i) !== word.at(-(i + 1))) {
      return false;
    }
  }
  return true;
}

// функция отбора чисел из строки
function getNumber (text) {
  text = String(text);
  let numbersLine = '';
  for (let i = 0; i + 1 <= text.length; i ++) {
    if (Number.isInteger(Number(text.at(i)))) {
      numbersLine = `${numbersLine}${text.at(i)}`;
    }
  }
  return numbersLine;
}

// функция возвращающая дополненную строку
function completeString (oldString, minLength, additionalString) {
  const NUMBER_REMAINING_SYMBOLS = minLength - oldString.length;
  let newString = '';
  if (NUMBER_REMAINING_SYMBOLS >= 0) {
    return oldString;
  }

  for (let i = 0; i < NUMBER_REMAINING_SYMBOLS; i += additionalString.length) {
    const difference = NUMBER_REMAINING_SYMBOLS - i;
    if (additionalString.length <= difference) {
      newString = `${additionalString}${newString}`;
    } else {
      newString = `${additionalString.at(0, difference - 1)}${newString}`;
    }
  }
  return `${newString}${oldString}`;
}
