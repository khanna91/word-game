const task = require('./sync.task');

jest.mock('../lib/word-maker');
const wordMaker = require('../lib/word-maker'); // eslint-disable-line

describe('Task - fetchNumbersWithRandomString', () => {
  beforeEach(() => {
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return empty array', () => {
    const result = task.fetchNumbersWithRandomString();
    expect(result).toBeArray();
    expect(result).toBeArrayOfSize(0);
  });

  it('should return 5 words', () => {
    wordMaker.getRandomWordSync.mockImplementationOnce(() => 'word1')
      .mockImplementationOnce(() => 'word2')
      .mockImplementationOnce(() => 'word3')
      .mockImplementationOnce(() => 'word4')
      .mockImplementationOnce(() => 'word5');
    const result = task.fetchNumbersWithRandomString(5);
    expect(result).toBeArray();
    expect(result).toBeArrayOfSize(5);
    expect(result).toIncludeAllMembers(
      ['1: word1', '2: word2', '3: word3', '4: word4', '5: word5']
    );
  });

  it('should return 5 words including Doh!', () => {
    wordMaker.getRandomWordSync.mockImplementationOnce(() => 'word1')
      .mockImplementationOnce(() => 'word2')
      .mockImplementationOnce(() => {
        throw new Error();
      })
      .mockImplementationOnce(() => 'word4')
      .mockImplementationOnce(() => {
        throw new Error();
      });
    const result = task.fetchNumbersWithRandomString(5, true);
    expect(result).toBeArray();
    expect(result).toBeArrayOfSize(5);
    expect(result).toIncludeAllMembers(
      ['1: word1', '2: word2', '3: Doh!', '4: word4', '5: Doh!']
    );
  });
});

describe('Task - fetchFizzBuzz', () => {
  beforeEach(() => {
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return empty array', () => {
    const result = task.fetchFizzBuzz();
    expect(result).toBeArray();
    expect(result).toBeArrayOfSize(0);
  });

  it('should return 15 words including FizzBuzz Pattern', () => {
    wordMaker.getRandomWordSync.mockImplementationOnce(() => 'word')
      .mockImplementationOnce(() => {
        throw new Error();
      });
    const result = task.fetchFizzBuzz(15, true);
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
