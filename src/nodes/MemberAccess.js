const {
  doc: {
    builders: { group, ifBreak, indent, softline }
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

const shallIndent = (path) => {
  let i = 0;
  let elderNode = path.getParentNode(i);
  while (elderNode) {
    if (
      elderNode.type === 'VariableDeclarationStatement' ||
      elderNode.type === 'BinaryOperation'
    )
      return false;
    i += 1;
    elderNode = path.getParentNode(i);
  }
  return true;
};

const MemberAccess = {
  print: ({ node, path, print }) => {
    const expressionDoc = path.call(print, 'expression');
    let separator = [softline, '.'];
    let labelData;
    if (expressionDoc.label) {
      labelData = JSON.parse(expressionDoc.label);
    }
    if (labelData && labelData.groupId) {
      separator = ifBreak('.', [softline, '.'], {
        groupId: labelData.groupId
      });
    }

    const doc = [
      expressionDoc,
      shallIndent(path) ? indent(separator) : separator,
      node.memberName
    ];

    return isBeginnigOfChain(path) ? group(doc) : doc;
  }
};

module.exports = MemberAccess;
