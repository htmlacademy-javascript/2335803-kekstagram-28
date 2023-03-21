const checkLength = (txt, qnt) => txt.length > qnt;

const checkPolindrom = (word) => {
  const limit = Math.trunc(word.length / 2);
  const updatedWord = word.toLowerCase().replaceAll(' ', '');
  for (let i = 0; i < limit; i ++) {
    if (updatedWord.at(i) !== updatedWord.at(-(i + 1))) {
      return false;
    }
  }
  return true;
};

const extractNumber = (text) => {
  const updatedText = String(text);
  let numbersLine = '';
  for (let i = 0; i + 1 <= updatedText.length; i ++) {
    if (Number.isInteger(Number(text.at(i)))) {
      numbersLine = `${numbersLine}${text.at(i)}`;
    }
  }
  return numbersLine;
};

const completeString = (oldString, minLength, additionalString) => {
  const numberRemainingSymbols = minLength - oldString.length;
  let newString = '';
  if (numberRemainingSymbols >= 0) {
    return oldString;
  }

  for (let i = 0; i < numberRemainingSymbols; i += additionalString.length) {
    const difference = numberRemainingSymbols - i;
    newString = (additionalString.length <= difference) ? `${additionalString}${newString}` :
      `${additionalString.at(0, difference - 1)}${newString}`;
  }
  return `${newString}${oldString}`;
};
