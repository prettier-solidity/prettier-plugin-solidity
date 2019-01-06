// eslint-disable-next-line no-unused-vars
const clean = (ast, newObj, parent) => {
  ['code', 'codeStart', 'loc', 'operations', 'range'].forEach(name => {
    delete newObj[name]; // eslint-disable-line no-param-reassign
  });
};

module.exports = clean;
