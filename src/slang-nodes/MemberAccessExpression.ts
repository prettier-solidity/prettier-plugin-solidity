import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { isLabel } from '../slang-utils/is-label.js';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { memberAccessChainLabel } from '../slang-printers/print-member-access-chain-item.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';
import { TerminalNode } from './TerminalNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { NodeInitializationAttributes } from './types.d.ts';

const { group, indent, label, softline } = doc.builders;

const separatorLabel = Symbol('separator');

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
  const firstSeparatorIndex = chain.findIndex((element) =>
    isLabel(element, separatorLabel)
  );

  // We wrap the expression in a label in case there is an IndexAccess or
  // a FunctionCall following this MemberAccess.
  return label(memberAccessChainLabel, [
    // The doc[] before the first separator
    chain.slice(0, firstSeparatorIndex),
    // The doc[] containing the rest of the chain
    group(indent(chain.slice(firstSeparatorIndex)))
  ]);
}

export class MemberAccessExpression extends SlangNode {
  readonly kind = NonterminalKind.MemberAccessExpression;

  readonly #endOfChain: boolean;

  operand: Expression['variant'];

  member: TerminalNode;

  constructor(
    ast: ast.MemberAccessExpression,
    collected: CollectedMetadata,
    { endOfChain }: NodeInitializationAttributes = {}
  ) {
    super(ast, collected);

    this.operand = extractVariant(
      new Expression(ast.operand, collected, { endOfChain: false })
    );
    this.member = new TerminalNode(ast.member, collected);

    this.updateMetadata(this.operand);

    this.#endOfChain = endOfChain ?? true;
  }

  print(print: PrintFunction): Doc {
    let operandDoc = print('operand');
    if (Array.isArray(operandDoc)) {
      operandDoc = operandDoc.flat();
    }

    const document = [
      operandDoc,
      label(separatorLabel, [softline, '.']),
      print('member')
    ].flat();

    return this.#endOfChain ? processChain(document) : document;
  }
}
