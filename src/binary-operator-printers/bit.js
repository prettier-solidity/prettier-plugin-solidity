const arithmetic = require('./arithmetic.js');

module.exports = {
  match: (op) => ['&', '|', '^'].includes(op),
  print: arithmetic.print
};
