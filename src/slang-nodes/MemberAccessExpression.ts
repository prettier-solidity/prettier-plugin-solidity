import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { isLabel } from '../slang-utils/is-label.js';
import { createKindCheckFunction } from '../slang-utils/create-kind-check-function.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { Expression } from './Expression.js';
import { Identifier } from './Identifier.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, StrictAstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

const { group, indent, label, softline } = doc.builders;

const isChainableExpression = createKindCheckFunction([
  NonterminalKind.FunctionCallExpression,
  NonterminalKind.IndexAccessExpression,
  NonterminalKind.MemberAccessExpression
]);

function isEndOfChain(
  node: MemberAccessExpression,
  path: AstPath<StrictAstNode>
): boolean {
  for (
    let i = 2, current: StrictAstNode = node, grandparent = path.getNode(i)!;
    isChainableExpression(grandparent);
    i += 2, current = grandparent, grandparent = path.getNode(i)!
  ) {
    switch (grandparent.kind) {
      case NonterminalKind.MemberAccessExpression:
        // If `grandparent` is a MemberAccessExpression we are not at the end
        // of the chain.
        return false;
      case NonterminalKind.IndexAccessExpression:
        // If `grandparent` is an IndexAccessExpression and `current` is not
        // the operand then it must be the start or the end in which case it is
        // the end of the chain.
        if (current !== grandparent.operand.variant) return true;
        break;
      case NonterminalKind.FunctionCallExpression:
        // If `grandparent` is a FunctionCallExpression and `current` is not
        // the operand then it must be and argument in which case it is the end
        // of the chain.
        if (current !== grandparent.operand.variant) return true;
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
function processChain(chain: Doc[]): Doc {
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

export class MemberAccessExpression implements SlangNode {
  readonly kind = NonterminalKind.MemberAccessExpression;

  comments;

  loc;

  operand: Expression;

  member: Identifier;

  constructor(
    ast: ast.MemberAccessExpression,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast);

    this.operand = new Expression(ast.operand, options);
    this.member = new Identifier(ast.member);

    metadata = updateMetadata(metadata, [this.operand]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<MemberAccessExpression>, print: PrintFunction): Doc {
    let operandDoc = path.call(print, 'operand');
    if (Array.isArray(operandDoc)) {
      operandDoc = operandDoc.flat();
    }

    const document = [
      operandDoc,
      label('separator', [softline, '.']),
      path.call(print, 'member')
    ].flat();

    return isEndOfChain(this, path) ? processChain(document) : document;
  }
}
