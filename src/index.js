const {
  fetchNumbersWithRandomString, fetchFizzBuzz, asyncFetchNumbersWithRandomString, asyncFetchFizzBuzz
} = require('./tasks');
const { printArray, saveArrayToFile } = require('./utils/helper');

let result;
/**
 * Task 1: Print numbers from 1 to 100 to the console
 */
result = fetchNumbersWithRandomString(100);
printArray(result);
saveArrayToFile('task1', result); // Task 5: (Saving to file)

/**
 * Task 2: "Fizz Buzz" program
 */
result = fetchFizzBuzz(100);
printArray(result);
saveArrayToFile('task2', result); // Task 5: (Saving to file)

/**
 * Task 3 - a: Print numbers from 1 to 100 to the console using promise
 */
asyncFetchNumbersWithRandomString(100).then((data) => {
  printArray(data);
  saveArrayToFile('task3a', data); // Task 5: (Saving to file)
});

/**
 * Task 3 - b: "Fizz Buzz" program using promise
 */
asyncFetchFizzBuzz(100).then((data) => {
  printArray(data);
  saveArrayToFile('task3b', data); // Task 5: (Saving to file)
});

/**
 * Task 4: Error Handling, Print Doh! if error occurs
 */

// This will print random 100 numbers with random word,
// if error occurs it will print Doh! with number
// - Using sync approach
result = fetchNumbersWithRandomString(100, true);
printArray(result);
saveArrayToFile('task4a_sync', result); // Task 5: (Saving to file)
// - Using promises
asyncFetchNumbersWithRandomString(100, true).then((data) => {
  printArray(data);
  saveArrayToFile('task4a_async', data); // Task 5: (Saving to file)
});

// This will print "Fizz Buzz" problem, but if error
// occurs while retreiving word it will print Doh!
// with number
// - Using sync approach
result = fetchFizzBuzz(100, true);
printArray(result);
saveArrayToFile('task4b_sync', result); // Task 5: (Saving to file)
// - Using promises
asyncFetchFizzBuzz(100).then((data) => {
  printArray(data);
  saveArrayToFile('task4b_async', data); // Task 5: (Saving to file)
});
