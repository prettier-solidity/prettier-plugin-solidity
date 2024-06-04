import { doc } from 'prettier';
import { isLabel } from '../common/util.js';

const { group, indent, label, softline } = doc.builders;

const isEndOfChain = (node, path) => {
  let i = 0;
  let currentNode = node;
  let parentNode = path.getParentNode(i);
  while (
    parentNode &&
    [
      'Expression',
      'FunctionCallExpression',
      'IndexAccessExpression',
      'MemberAccessExpression'
    ].includes(parentNode.kind)
  ) {
    switch (parentNode.kind) {
      case 'MemberAccessExpression':
        // If direct ParentNode is a MemberAccess we are not at the end of the
        // chain.
        return false;

      case 'IndexAccessExpression':
        // If direct ParentNode is an IndexAccess and currentNode is not the
        // operand then it must be the start or the end in which case it is the
        // end of the chain.
        if (currentNode !== parentNode.operand) return true;
        break;

      case 'FunctionCallExpression':
        // If direct ParentNode is a FunctionCall and currentNode is not the
        // operand then it must be and argument in which case it is the end
        // of the chain.
        if (currentNode !== parentNode.operand) return true;
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
 * The second array is grouped and indented, while the first element's
 * formatting logic remains separated.
 *
 * That way the first element can safely split into multiple lines and the rest
 * of the chain will continue its formatting rules as normal.
 *
 * i.e.
 * ```
 * functionCall(arg1, arg2).rest.of.chain
 *
 * functionCall(arg1, arg2)
 *     .long
 *     .rest
 *     .of
 *     .chain
 *
 * functionCall(
 *     arg1,
 *     arg2
 * ).rest.of.chain
 *
 * functionCall(
 *     arg1,
 *     arg2
 * )
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
  const firstSeparatorIndex = chain.findIndex(
    (element) => isLabel(element) && element.label === 'separator'
  );
  // The doc[] before the first separator
  const firstExpression = chain.slice(0, firstSeparatorIndex);
  // The doc[] containing the rest of the chain
  const restOfChain = group(indent(chain.slice(firstSeparatorIndex)));

  // We wrap the expression in a label in case there is an IndexAccess or
  // a FunctionCall following this MemberAccess.
  return label('MemberAccessChain', group([firstExpression, restOfChain]));
};

export const MemberAccessExpression = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    operand: parse(ast.operand, options, parse),
    period: ast.period.text,
    member: parse(ast.member, options, parse)
  }),
  print: ({ node, path, print }) => {
    let operandDoc = path.call(print, 'operand');
    if (Array.isArray(operandDoc)) {
      operandDoc = operandDoc.flat();
    }

    const document = [
      operandDoc,
      label('separator', [softline, node.period]),
      path.call(print, 'member')
    ].flat();

    return isEndOfChain(node, path) ? processChain(document) : document;
  }
};
