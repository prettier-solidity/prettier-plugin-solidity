const runSpec = require('./run_spec.js');

Object.defineProperty(global, 'run_spec', {
  get() {
    return runSpec;
  }
});
