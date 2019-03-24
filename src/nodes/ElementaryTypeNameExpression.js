/* eslint-disable implicit-arrow-linebreak */
const ElementaryTypeNameExpression = {
  print: ({ path, print }) => path.call(print, 'typeName')
};

module.exports = ElementaryTypeNameExpression;
