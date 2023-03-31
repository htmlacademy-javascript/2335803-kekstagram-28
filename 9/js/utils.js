const generateRandomNumber = (firstValue, secondValue) => {
  const lower = Math.min(firstValue, secondValue);
  const upper = Math.max(firstValue, secondValue);
  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

const createIdGenerator = () => {
  let lastGeneratedId = 0;

  return () => {
    lastGeneratedId ++;
    return lastGeneratedId ;
  };
};

const createRandomIdFromGenerator = (firstValue, secondValue) => {
  const previousValues = [];

  return function () {
    let newValue = generateRandomNumber(firstValue, secondValue);
    if (previousValues.length >= (secondValue - firstValue + 1)) {
      return;
    }
    while (previousValues.includes(newValue)) {
      newValue = generateRandomNumber(firstValue, secondValue);
    }
    previousValues.push(newValue);
    return newValue;
  };
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const createElement = (tagName, className) => {
  const newElement = document.createElement(tagName);
  newElement.classList.add(className);
  return newElement;
};

const ALERT_SHOW_TIME = 5000;

const showAllert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '25%';
  alertContainer.style.top = '25%';
  alertContainer.style.right = '25%';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.color = 'red';
  alertContainer.style.backgroundColor = 'white';

  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};


export{generateRandomNumber, createIdGenerator, createRandomIdFromGenerator,
  isEscapeKey, createElement, showAllert};
