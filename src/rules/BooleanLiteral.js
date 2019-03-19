const BooleanLiteral = (node, path, options, print) =>
  node.value ? 'true' : 'false';

module.exports = BooleanLiteral;
