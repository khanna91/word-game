const { getRandomWordSync } = require('../lib/word-maker');
const logger = require('../utils/logger');

const fetchNumbersWithRandomString = (length = 0, withErrors = false) => {
  const result = [];
  for (let i = 1; i <= length; i += 1) {
    try {
      result.push(`${i}: ${getRandomWordSync({ withErrors })}`);
    } catch (err) {
      logger.error(`Something wrong while fetching word for ${i} in fetchNumbersWithRandomString`);
      result.push(`${i}: Doh!`);
    }
  }
  return result;
};

const fetchFizzBuzz = (length, withErrors = false) => {
  const result = [];
  for (let i = 1; i <= length; i += 1) {
    try {
      let word;
      if (i % 3 === 0 && i % 5 === 0) {
        word = 'FizzBuzz';
      } else if (i % 3 === 0) {
        word = 'Fizz';
      } else if (i % 5 === 0) {
        word = 'Buzz';
      } else {
        word = getRandomWordSync({ withErrors });
      }
      result.push(`${i}: ${word}`);
    } catch (err) {
      logger.error(`Something wrong while fetching word for ${i} in fetchFizzBuzz`);
      result.push(`${i}: Doh!`);
    }
  }
  return result;
};

module.exports = {
  fetchNumbersWithRandomString,
  fetchFizzBuzz
};
