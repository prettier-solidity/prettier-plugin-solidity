import { NonterminalKind, TerminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { isBinaryOperation } from '../slang-utils/is-binary-operation.js';

import type { AstPath, Doc, ParserOptions } from 'prettier';
import type {
  AstNode,
  BinaryOperation,
  StrictAstNode
} from '../slang-nodes/types.d.ts';
import type { PrintFunction } from '../types.d.ts';

const { group, line } = doc.builders;

function rightOperandPrint(
  node: BinaryOperation,
  path: AstPath<BinaryOperation>,
  print: PrintFunction,
  options: ParserOptions<AstNode>
): Doc {
  const rightOperand =
    options.experimentalOperatorPosition === 'end'
      ? [` ${node.operator}`, line, path.call(print, 'rightOperand')]
      : [line, `${node.operator} `, path.call(print, 'rightOperand')];

  // If there's only a single binary expression, we want to create a group in
  // order to avoid having a small right part like -1 be on its own line.
  const leftOperand = node.leftOperand.variant;
  const grandparentNode = path.grandparent as StrictAstNode;
  const shouldGroup =
    (leftOperand.kind === TerminalKind.Identifier ||
      !isBinaryOperation(leftOperand)) &&
    (!isBinaryOperation(grandparentNode) ||
      grandparentNode.kind === NonterminalKind.AssignmentExpression);

  return shouldGroup ? group(rightOperand) : rightOperand;
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
