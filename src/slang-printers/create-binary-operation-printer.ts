import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { isBinaryOperation } from '../slang-utils/is-binary-operation.js';
import { TerminalNode } from '../slang-nodes/TerminalNode.js';

import type { AstPath, Doc, ParserOptions } from 'prettier';
import type {
  AstNode,
  BinaryOperation,
  StrictAstNode
} from '../slang-nodes/types.d.ts';
import type { PrintFunction } from '../types.d.ts';

const { group, line } = doc.builders;

function rightOperandPrint(
  { operator, leftOperand }: BinaryOperation,
  path: AstPath<BinaryOperation>,
  print: PrintFunction,
  options: ParserOptions<AstNode>
): Doc {
  const rightOperand = path.call(print, 'rightOperand');
  const rightOperandDoc =
    options.experimentalOperatorPosition === 'end'
      ? [` ${operator}`, line, rightOperand]
      : [line, `${operator} `, rightOperand];

  // If there's only a single binary expression, we want to create a group in
  // order to avoid having a small right part like -1 be on its own line.
  const parent = path.parent as StrictAstNode;
  const shouldGroup =
    (leftOperand instanceof TerminalNode || !isBinaryOperation(leftOperand)) &&
    (!isBinaryOperation(parent) ||
      parent.kind === NonterminalKind.AssignmentExpression);

  return shouldGroup ? group(rightOperandDoc) : rightOperandDoc;
}

export const createBinaryOperationPrinter =
  (
    groupRulesBuilder: (
      path: AstPath<BinaryOperation>
    ) => (document: Doc) => Doc,
    indentRulesBuilder: (
      path: AstPath<BinaryOperation>,
      options: ParserOptions<AstNode>
    ) => (document: Doc) => Doc
  ) =>
  (
    node: BinaryOperation,
    path: AstPath<BinaryOperation>,
    print: PrintFunction,
    options: ParserOptions<AstNode>
  ): Doc => {
    const groupRules = groupRulesBuilder(path);
    const indentRules = indentRulesBuilder(path, options);

    return groupRules([
      path.call(print, 'leftOperand'),
      indentRules(rightOperandPrint(node, path, print, options))
    ]);
  };
