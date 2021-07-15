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

/**
 * processChain expects the doc[] of the full chain of MemberAccess.
 *
 * It uses the separator label to split the chain into 2 arrays.
 * The first array is the doc[] corresponding to the first element before the
 * first separator.
 * The second array contains the rest of the chain.
 *
 * The indentation of the whole chain depends on the result of the first
 * element.
 *
 * If the first element breaks into multiple lines, we won't indent the rest of
 * the chain as the last line (most likely a closing parentheses) won't be
 * indented.
 *
 * i.e.
 * ```
 * functionCall(
 *     arg1,
 *     arg2
 * ).rest.of.chain
 *
 * functionCall(
 *     arg1,
 *     arg2
 * )
 * .long
 * .rest
 * .of
 * .chain
 * ```
 *
 * If the first element doesn't break into multiple lines we treat the rest of
 * the chain as a normal chain and proceed to indent it.
 *
 *
 * i.e.
 * ```
 * a = functionCall(arg1, arg2).rest.of.chain
 *
 * b = functionCall(arg1, arg2)
 *     .long
 *     .rest
 *     .of
 *     .chain
 * ```
 *
 * NOTE: As described in the examples above, the rest of the chain will be grouped
 * and try to stay in the same line as the end of the first element.
 *
 * @param {doc[]} chain is the full chain of MemberAccess
 * @returns a processed doc[] with the proper grouping and indentation ready to
 * be printed.
 */
const processChain = (chain) => {
  const firstSeparatorIndex = chain.findIndex((element) => {
    if (element.label) {
      return JSON.parse(element.label).type === 'separator';
    }
    return false;
  });
  // We fetch the groupId from the firstSeparator
  const { groupId } = JSON.parse(chain[firstSeparatorIndex].label);
  // The doc[] before the first separator
  const firstExpression = chain.slice(0, firstSeparatorIndex);
  // The doc[] containing the rest of the chain
  const restOfChain = group(chain.slice(firstSeparatorIndex));

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
        // if there's a groupId in the data, we pass it to the separator as
        // this doc[] is going to be stripped of it's metadata
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
