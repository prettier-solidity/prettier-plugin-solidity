'use strict';

function clean(ast, newObj, parent) {
  ['range', 'loc'].forEach(name => {
    delete newObj[name];
  });
}

module.exports = clean;
