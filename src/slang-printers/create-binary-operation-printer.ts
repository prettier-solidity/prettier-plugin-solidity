import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { isBinaryOperation } from '../slang-utils/is-binary-operation.js';

import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { BinaryOperation, PrintableNode } from '../slang-nodes/types.d.ts';
import type { PrintFunction } from '../types.d.ts';

const { group, line } = doc.builders;

function rightOperandPrint(
  { operator, leftOperand }: BinaryOperation,
  path: AstPath<PrintableNode>,
  print: PrintFunction,
  options: ParserOptions<PrintableNode>
): Doc {
  const rightOperand = path.call(print, 'rightOperand');
  const rightOperandDoc =
    options.experimentalOperatorPosition === 'end'
      ? [` ${operator}`, line, rightOperand]
      : [line, `${operator} `, rightOperand];

  // If there's only a single binary expression, we want to create a group in
  // order to avoid having a small right part like -1 be on its own line.
  const parent = path.parent!;
  const shouldGroup =
    !isBinaryOperation(leftOperand) &&
    (!isBinaryOperation(parent) ||
      parent.kind === NonterminalKind.AssignmentExpression);

  return shouldGroup ? group(rightOperandDoc) : rightOperandDoc;
}

export const createBinaryOperationPrinter =
  (
    groupRulesBuilder: (path: AstPath<PrintableNode>) => (document: Doc) => Doc,
    indentRulesBuilder: (
      node: BinaryOperation,
      path: AstPath<PrintableNode>
    ) => (document: Doc) => Doc
  ) =>
  (
    node: BinaryOperation,
    path: AstPath<PrintableNode>,
    print: PrintFunction,
    options: ParserOptions<PrintableNode>
  ): Doc => {
    const groupRules = groupRulesBuilder(path);
    const indentRules = indentRulesBuilder(node, path);

    return groupRules([
      path.call(print, 'leftOperand'),
      indentRules(rightOperandPrint(node, path, print, options))
    ]);
  };
