const {
  doc: {
    builders: { group, ifBreak, indent, softline }
  }
} = require('prettier/standalone');

const isEndOfChain = (node, path) => {
  let i = 0;
  let currentNode = node;
  let parentNode = path.getParentNode(i);
  while (
    parentNode &&
    [
      'FunctionCall',
      'IndexAccess',
      'NameValueExpression',
      'MemberAccess'
    ].includes(parentNode.type)
  ) {
    switch (parentNode.type) {
      case 'MemberAccess':
        // If direct ParentNode is a MemberAcces we are not at the end of the chain
        return false;

      case 'IndexAccess':
        // If direct ParentNode is an IndexAccess and currentNode is not the base
        // then it must be the index in which case it is the end of the chain.
        if (currentNode !== parentNode.base) return true;
        break;

      case 'FunctionCall':
        // If direct ParentNode is a FunctionCall and currentNode is not the expression
        // then it must be and argument in which case it is the end of the chain.
        if (currentNode !== parentNode.expression) return true;
        break;

      default:
        break;
    }

    i += 1;
    currentNode = parentNode;
    parentNode = path.getParentNode(i);
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

    return isEndOfChain(node, path) ? group(doc) : doc;
  }
};

module.exports = MemberAccess;
