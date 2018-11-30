const util = require('./logger.util');

describe('Utility - logger', () => {
  let infoSpy;
  let errorSpy;
  const req = 'hello logger';

  beforeEach(() => {
    infoSpy = jest.spyOn(util.logger, 'info');
    errorSpy = jest.spyOn(util.logger, 'error');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should write info log stream', () => {
    util.logger.info(req);

    expect(infoSpy).toHaveBeenCalledTimes(1);
  });

  it('should write error log stream', () => {
    util.logger.error(req);

    expect(errorSpy).toHaveBeenCalledTimes(1);
  });
});
