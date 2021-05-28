const {
  doc: {
    builders: { group, indent, softline }
  }
} = require('prettier/standalone');

const isBeginnigOfChain = (path) => {
  const parentNodeType = path.getParentNode().type;

  if (parentNodeType === 'MemberAccess') return false;
  if (parentNodeType === 'FunctionCall') {
    const grandParentNodeType = path.getParentNode(1).type;
    return grandParentNodeType !== 'MemberAccess';
  }

  return true;
};

const MemberAccess = {
  print: ({ node, path, print }) => {
    const doc = [
      path.call(print, 'expression'),
      indent([softline, '.', node.memberName])
    ];

    return isBeginnigOfChain(path) ? group(doc) : doc;
  }
};

module.exports = MemberAccess;
