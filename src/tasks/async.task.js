const { getRandomWord } = require('../lib/word-maker');
const logger = require('../utils/logger');
const bluebirdExtension = require('../utils/bluebird-extension');

/**
 * Function to settle all the promises
 * @param {Array} promises              List of promises
 * @param {String} funcName             Function name of caller
 *
 * @return {Promise}
 *
 * @private
 */
const resolvePromise = async (promises, funcName) => {
  const data = await bluebirdExtension.allSettled(promises);
  const result = [];
  data.forEach((word, key) => {
    if (word.state !== 'fulfilled') {
      logger.error(`Something wrong while fetching word for ${key + 1} in ${funcName}`);
      result.push(`${key + 1}: Doh!`);
    } else {
      result.push(`${key + 1}: ${word.value}`);
    }
  });
  return result;
};

/**
 * Function to return list of numbers with random string
 * @param {Number} length                 Length of array to print
 * @param {Boolean} withErrors            Indication to allow errors while fetching random word
 *
 * @return {Promise}
 *
 * @public
 */
const asyncFetchNumbersWithRandomString = (length = 0, withErrors = false) => {
  const promises = [];
  for (let i = 1; i <= length; i += 1) {
    promises.push(getRandomWord({ withErrors }));
  }
  return resolvePromise(promises, 'asyncFetchNumbersWithRandomString');
};

/**
 * Function to get FizzBuzz list
 * @param {Number} length                 Length of array to print
 * @param {Boolean} withErrors            Indication to allow errors while fetching random word
 *
 * @return {Promise}
 */
const asyncFetchFizzBuzz = (length, withErrors = false) => {
  const promises = [];
  for (let i = 1; i <= length; i += 1) {
    if (i % 3 === 0 && i % 5 === 0) {
      promises.push(Promise.resolve('FizzBuzz'));
    } else if (i % 3 === 0) {
      promises.push(Promise.resolve('Fizz'));
    } else if (i % 5 === 0) {
      promises.push(Promise.resolve('Buzz'));
    } else {
      promises.push(getRandomWord({ withErrors }));
    }
  }
  return resolvePromise(promises, 'asyncFetchFizzBuzz');
};

module.exports = {
  asyncFetchNumbersWithRandomString,
  asyncFetchFizzBuzz
};
