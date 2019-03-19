const BooleanLiteral = (node, path, options, print) => {
  return node.value ? 'true' : 'false';
};

module.exports = BooleanLiteral;
