const nodes = require('./nodes');
const { hasNodeIgnoreComment } = require('./prettier-comments/common/util.js');

function genericPrint(path, options, print) {
  const node = path.getValue();
  if (node === null) {
    return '';
  }

  if (!(node.type in nodes)) {
    throw new Error(`Unknown type: ${JSON.stringify(node.type)}`);
  }

  if (hasNodeIgnoreComment(node)) {
    return options.originalText.slice(
      options.locStart(node),
      options.locEnd(node) + 1
    );
  }

  return nodes[node.type].print({ node, options, path, print });
}

module.exports = genericPrint;
