const path = require('path');
const vm = require('vm');
const createSandBox = require('../config/utils/create-sandbox.cjs');

const sandbox = createSandBox({
  files: [path.join(__dirname, '../../dist/test.cjs')]
});

module.exports = {
  format(input) {
    return vm.runInNewContext('format($$$input);', {
      $$$input: input,
      ...sandbox
    });
  }
};
