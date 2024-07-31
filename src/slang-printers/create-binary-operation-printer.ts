import { doc } from 'prettier';
import { isBinaryOperation } from '../slang-utils/is-binary-operation.js';

import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, BinaryOperation } from '../types.js';

const { group, line } = doc.builders;

function rightOperandPrint(
  node: BinaryOperation,
  path: AstPath,
  print: (path: AstPath) => Doc
): Doc {
  const rightOperand = [line, path.call(print, 'rightOperand')];

  // If it's a single binary operation, avoid having a small right
  // operand like - 1 on its own line
  const shouldGroup =
    !(
      typeof node.leftOperand.variant !== 'string' &&
      isBinaryOperation(node.leftOperand.variant)
    ) && !isBinaryOperation(path.getNode(2) as AstNode);

  return shouldGroup ? group(rightOperand) : rightOperand;
}

export const createBinaryOperationPrinter =
  (
    groupRulesBuilder: (path: AstPath) => (document: Doc) => Doc,
    indentRulesBuilder: (
      path: AstPath,
      options: ParserOptions<AstNode>
    ) => (document: Doc) => Doc
  ) =>
  (
    node: BinaryOperation,
    path: AstPath,
    print: (path: AstPath) => Doc,
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
