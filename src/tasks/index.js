const { fetchNumbersWithRandomString, fetchFizzBuzz } = require('./sync.task');
const { asyncFetchNumbersWithRandomString, asyncFetchFizzBuzz } = require('./async.task');

module.exports = {
  fetchNumbersWithRandomString,
  fetchFizzBuzz,
  asyncFetchNumbersWithRandomString,
  asyncFetchFizzBuzz
};
