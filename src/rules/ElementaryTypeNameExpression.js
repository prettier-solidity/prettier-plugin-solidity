const ElementaryTypeNameExpression = (node, path, options, print) =>
  path.call(print, 'typeName');

module.exports = ElementaryTypeNameExpression;
