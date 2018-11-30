const task = require('./async.task');

jest.mock('../lib/word-maker');
const wordMaker = require('../lib/word-maker'); // eslint-disable-line

describe('Task - asyncFetchNumbersWithRandomString', () => {
  beforeEach(() => {
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return empty array', async () => {
    const result = await task.asyncFetchNumbersWithRandomString();
    expect(result).toBeArray();
    expect(result).toBeArrayOfSize(0);
  });

  it('should return 5 words', async () => {
    wordMaker.getRandomWord.mockImplementationOnce(() => Promise.resolve('word1'))
      .mockImplementationOnce(() => Promise.resolve('word2'))
      .mockImplementationOnce(() => Promise.resolve('word3'))
      .mockImplementationOnce(() => Promise.resolve('word4'))
      .mockImplementationOnce(() => Promise.resolve('word5'));
    const result = await task.asyncFetchNumbersWithRandomString(5);
    expect(result).toBeArray();
    expect(result).toBeArrayOfSize(5);
    expect(result).toIncludeAllMembers(
      ['1: word1', '2: word2', '3: word3', '4: word4', '5: word5']
    );
  });

  it('should return 5 words', async () => {
    wordMaker.getRandomWord.mockImplementationOnce(() => Promise.resolve('word1'))
      .mockImplementationOnce(() => Promise.resolve('word2'))
      .mockImplementationOnce(() => Promise.reject(new Error()))
      .mockImplementationOnce(() => Promise.resolve('word4'))
      .mockImplementationOnce(() => Promise.reject(new Error()));
    const result = await task.asyncFetchNumbersWithRandomString(5);
    expect(result).toBeArray();
    expect(result).toBeArrayOfSize(5);
    expect(result).toIncludeAllMembers(
      ['1: word1', '2: word2', '3: Doh!', '4: word4', '5: Doh!']
    );
  });
});

describe('Task - asyncFetchFizzBuzz', () => {
  beforeEach(() => {
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return empty array', async () => {
    const result = await task.asyncFetchFizzBuzz();
    expect(result).toBeArray();
    expect(result).toBeArrayOfSize(0);
  });

  it('should return 15 words including FizzBuzz Pattern', async () => {
    wordMaker.getRandomWord.mockImplementationOnce(() => Promise.resolve('word1'))
      .mockImplementationOnce(() => Promise.reject(new Error()));
    const result = await task.asyncFetchFizzBuzz(15, true);
    expect(result).toBeArray();
    expect(result).toBeArrayOfSize(15);
    expect(result[1]).toBe('2: Doh!');
    expect(result[2]).toBe('3: Fizz');
    expect(result[5]).toBe('6: Fizz');
    expect(result[8]).toBe('9: Fizz');
    expect(result[11]).toBe('12: Fizz');
    expect(result[4]).toBe('5: Buzz');
    expect(result[9]).toBe('10: Buzz');
    expect(result[14]).toBe('15: FizzBuzz');
  });
});
