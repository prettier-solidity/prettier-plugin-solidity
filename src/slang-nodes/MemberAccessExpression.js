import { doc } from 'prettier';
import { isLabel } from '../common/util.js';
import { createKindCheckFunction } from '../common/slang-helpers.js';
import { SlangNode } from './SlangNode.js';

const { group, indent, label, softline } = doc.builders;

const isChainableExpression = createKindCheckFunction([
  'FunctionCallExpression',
  'IndexAccessExpression',
  'MemberAccessExpression'
]);

function isEndOfChain(node, path) {
  for (
    let i = 0, currentNode = node, grandparentNode = path.getNode(i + 2);
    isChainableExpression(grandparentNode);
    i += 2, currentNode = grandparentNode, grandparentNode = path.getNode(i + 2)
  ) {
    switch (grandparentNode.kind) {
      case 'MemberAccessExpression':
        // If direct ParentNode is a MemberAccess we are not at the end of the
        // chain.
        return false;

      case 'IndexAccessExpression':
        // If direct ParentNode is an IndexAccess and currentNode is not the
        // operand then it must be the start or the end in which case it is the
        // end of the chain.
        if (currentNode !== grandparentNode.operand.variant) return true;
        break;

      case 'FunctionCallExpression':
        // If direct ParentNode is a FunctionCall and currentNode is not the
        // operand then it must be and argument in which case it is the end
        // of the chain.
        if (currentNode !== grandparentNode.operand.variant) return true;
        break;

      default:
        break;
    }
  }
  return true;
}

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
function processChain(chain) {
  const firstSeparatorIndex = chain.findIndex(
    (element) => isLabel(element) && element.label === 'separator'
  );

  // We wrap the expression in a label in case there is an IndexAccess or
  // a FunctionCall following this MemberAccess.
  return label('MemberAccessChain', [
    // The doc[] before the first separator
    chain.slice(0, firstSeparatorIndex),
    // The doc[] containing the rest of the chain
    group(indent(chain.slice(firstSeparatorIndex)))
  ]);
}

export class MemberAccessExpression extends SlangNode {
  operand;

  period;

  member;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.parseChildrenNodes(ast, parse);
    this.initializeLoc(ast);
  }

  print(path, print) {
    let operandDoc = path.call(print, 'operand');
    if (Array.isArray(operandDoc)) {
      operandDoc = operandDoc.flat();
    }

    const document = [
      operandDoc,
      label('separator', [softline, this.period]),
      path.call(print, 'member')
    ].flat();

    return isEndOfChain(this, path) ? processChain(document) : document;
  }
}
