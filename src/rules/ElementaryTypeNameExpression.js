const ElementaryTypeNameExpression = (node, path, options, print) => {
  return path.call(print, 'typeName');
};

module.exports = ElementaryTypeNameExpression;
