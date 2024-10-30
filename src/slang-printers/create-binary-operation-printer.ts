import { TerminalKind } from '@nomicfoundation/slang/cst';
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
  print: PrintFunction
): Doc {
  const rightOperand = [line, path.call(print, 'rightOperand')];

  // If it's a single binary operation, avoid having a small right
  // operand like - 1 on its own line
  const shouldGroup =
    !(
      node.leftOperand.variant.kind !== TerminalKind.Identifier &&
      isBinaryOperation(node.leftOperand.variant)
    ) && !isBinaryOperation(path.getNode(2) as StrictAstNode);

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
      ` ${node.operator}`,
      indentRules(rightOperandPrint(node, path, print))
    ]);
  };
