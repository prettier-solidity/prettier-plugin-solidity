/* eslint-disable no-nested-ternary, operator-linebreak */

const rules = require('./rules');

function genericPrint(path, options, print) {
  const node = path.getValue();
  if (node === null) {
    return '';
  }

  if (!(node.type in rules)) {
    throw new Error(`Unknown type: ${JSON.stringify(node.type)}`);
  }

  return rules[node.type](node, path, options, print);
}

module.exports = genericPrint;
