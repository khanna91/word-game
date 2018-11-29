// Require the core node modules.
const bluebirdCore = require('bluebird');

// Create a scoped version of the bluebird library for this application. This way, we can
// mess with the instance and prototype methods without changing the configuration of the
// bluebird library that may be used by other dependencies.
// --
// READ MORE: http://bluebirdjs.com/docs/api/promise.getnewlibrarycopy.html
const bluebird = bluebirdCore.getNewLibraryCopy(); // eslint-disable-line no-use-before-define

// I resolve to a collection of settled values that match Q's implementation. Each result
// will contain a state of "fulfilled" or "rejected" and a "value" or "reason" property,
// respectively. Embedded rejections do not cause this promise to be rejected.
bluebird.allSettled = (promises) => {
  // We have to "wrap" each one of these promises in a reflect() call that will allow
  // us to collection all of the results, regardless of whether or not the individual
  // promises are resolved or rejected.
  const reflectedPromsies = promises.map((promise) => {
    promise = bluebird // eslint-disable-line
      .resolve(promise)
      .reflect() // Always "resolves" to state inspection.

      // NOTE: If I didn't care about being compatible with Q, I could omit
      // the following handler and just return the result of .reflect().
      .then((inspection) => {
        if (inspection.isFulfilled()) {
          return {
            state: 'fulfilled',
            value: inspection.value()
          };
        }
        return {
          state: 'rejected',
          reason: inspection.reason()
        };
      });

    return promise;
  });

  return bluebird.all(reflectedPromsies);
};

module.exports = bluebird;
