const nodes = require('./nodes');

function genericPrint(path, options, print) {
  const node = path.getValue();
  if (node === null) {
    return '';
  }

  if (!(node.type in nodes)) {
    throw new Error(`Unknown type: ${JSON.stringify(node.type)}`);
  }

  return nodes[node.type].print({ node, options, path, print });
}

module.exports = genericPrint;
