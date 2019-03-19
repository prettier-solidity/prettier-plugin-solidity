/* eslint-disable implicit-arrow-linebreak */
const ElementaryTypeNameExpression = (node, path, options, print) =>
  path.call(print, 'typeName');

module.exports = ElementaryTypeNameExpression;
