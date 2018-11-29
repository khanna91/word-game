const fs = require('fs');
const logger = require('../logger');

/**
 * Helper function to print all the values of array
 * @param {Array} array       The array whose value needs to be print
 */
exports.printArray = (array = []) => {
  array.forEach((value) => {
    console.log(value);
  });
};

/**
 * Helper function to save the array into file
 * @param {String} fileName             Filename to which data needs to store
 * @param {String} data                 Array content which needs to store
 */
exports.saveArrayToFile = (fileName, data) => {
  const file = fs.createWriteStream(`${fileName}.task.txt`);
  file.on('error', (err) => {
    logger.error(err);
  });
  data.forEach((v) => {
    file.write(`${v} \n`);
  });
  file.end();
};
