const {
  doc: {
    builders: { group, ifBreak, indent, label, softline }
  }
} = require('prettier');

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
        // If direct ParentNode is a MemberAccess we are not at the end of the
        // chain.
        return false;

      case 'IndexAccess':
        // If direct ParentNode is an IndexAccess and currentNode is not the base
        // then it must be the index in which case it is the end of the chain.
        if (currentNode !== parentNode.base) return true;
        break;

      case 'FunctionCall':
        // If direct ParentNode is a FunctionCall and currentNode is not the
        // expression then it must be and argument in which case it is the end
        // of the chain.
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

const processChain = (chain) => {
  const firstSeparatorIndex = chain.findIndex((element) => {
    if (element.label) {
      const labelData = JSON.parse(element.label);
      if (labelData && labelData.type) {
        return labelData.type === 'separator';
      }
    }
    return false;
  });
  const { groupId } = JSON.parse(chain[firstSeparatorIndex].label);
  const firstExpression = chain.slice(0, firstSeparatorIndex);

  const restOfChain = group(
    chain
      .slice(firstSeparatorIndex)
      .map((element) => {
        if (element.label) {
          return element.contents.flat();
        }
        return element;
      })
      .flat()
  );

  return groupId
    ? [
        ...firstExpression,
        ifBreak(restOfChain, indent(restOfChain), { groupId })
      ]
    : [...firstExpression, indent(restOfChain)];
};

const MemberAccess = {
  print: ({ node, path, print }) => {
    let expressionDoc = path.call(print, 'expression');
    const separatorLabel = {
      type: 'separator'
    };

    if (expressionDoc.label) {
      const labelData = JSON.parse(expressionDoc.label);
      if (labelData && labelData.groupId) {
        separatorLabel.groupId = labelData.groupId;
      }
      expressionDoc = expressionDoc.contents.flat();
    }

    const doc = [
      expressionDoc,
      label(JSON.stringify(separatorLabel), [softline, '.']),
      node.memberName
    ].flat();

    return isEndOfChain(node, path) ? group(processChain(doc)) : doc;
  }
};

module.exports = MemberAccess;
