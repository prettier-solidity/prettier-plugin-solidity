import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { createBinaryOperationPrinter } from './create-binary-operation-printer.js';
import { createKindCheckFunction } from '../slang-utils/create-kind-check-function.js';
import { isBinaryOperation } from '../slang-utils/is-binary-operation.js';

import type { AstPath, Doc } from 'prettier';
import type { BinaryOperation, StrictAstNode } from '../slang-nodes/types.d.ts';

const { group, indent } = doc.builders;

export const binaryGroupRulesBuilder =
  (shouldGroup: (node: BinaryOperation) => boolean) =>
  (path: AstPath<BinaryOperation>) =>
  (document: Doc): Doc => {
    const grandparentNode = path.getNode(2) as StrictAstNode;
    if (!isBinaryOperation(grandparentNode)) return group(document);
    if (shouldGroup(grandparentNode)) return group(document);
    return document;
  };

export const binaryIndentRulesBuilder =
  (shouldIndent: (node: BinaryOperation) => boolean) =>
  (path: AstPath<BinaryOperation>) =>
  (document: Doc): Doc => {
    let node = path.getNode() as StrictAstNode;
    for (let i = 2; ; i += 2) {
      const grandparentNode = path.getNode(i) as StrictAstNode;
      if (grandparentNode.kind === NonterminalKind.ReturnStatement) break;
      if (!isBinaryOperation(grandparentNode)) return indent(document);
      if (shouldIndent(grandparentNode)) return indent(document);
      if (node === grandparentNode.rightOperand.variant) break;
      node = grandparentNode;
    }
    return document;
  };

// By default group and indent binary operations only if grandparent is
// `ComparisonExpression` or `EqualityExpression`
const shouldGroupAndIndent = createKindCheckFunction([
  NonterminalKind.ComparisonExpression,
  NonterminalKind.EqualityExpression
]);

export const printBinaryOperation = createBinaryOperationPrinter(
  binaryGroupRulesBuilder(shouldGroupAndIndent),
  binaryIndentRulesBuilder(shouldGroupAndIndent)
);
