import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { createBinaryOperationPrinter } from './create-binary-operation-printer.js';
import { createKindCheckFunction } from '../slang-utils/create-kind-check-function.js';

import type { AstPath, Doc } from 'prettier';
import type {
  BinaryOperation,
  BinaryOperationWithoutComparison,
  StrictAstNode
} from '../slang-nodes/types.d.ts';

const { group, indent } = doc.builders;

const isBinaryOperationWithoutComparison = createKindCheckFunction([
  NonterminalKind.AdditiveExpression,
  NonterminalKind.MultiplicativeExpression,
  NonterminalKind.ExponentiationExpression,
  NonterminalKind.AssignmentExpression,
  NonterminalKind.BitwiseAndExpression,
  NonterminalKind.BitwiseOrExpression,
  NonterminalKind.BitwiseXorExpression,
  NonterminalKind.AndExpression,
  NonterminalKind.OrExpression,
  NonterminalKind.ShiftExpression
]) as (node: StrictAstNode) => node is BinaryOperationWithoutComparison;

export const binaryGroupRulesBuilder =
  (shouldGroup: (node: BinaryOperationWithoutComparison) => boolean) =>
  (path: AstPath<BinaryOperation>) =>
  (document: Doc): Doc => {
    const grandparentNode = path.getNode(2) as StrictAstNode;
    if (isBinaryOperationWithoutComparison(grandparentNode)) {
      return shouldGroup(grandparentNode) ? group(document) : document;
    }
    return group(document);
  };

export const binaryIndentRulesBuilder =
  (shouldIndent: (node: BinaryOperationWithoutComparison) => boolean) =>
  (path: AstPath<BinaryOperation>) =>
  (document: Doc): Doc => {
    let node = path.getNode() as StrictAstNode;
    for (let i = 2; ; i += 2) {
      const grandparentNode = path.getNode(i) as StrictAstNode;
      if (grandparentNode.kind === NonterminalKind.ReturnStatement) break;
      if (!isBinaryOperationWithoutComparison(grandparentNode)) {
        return indent(document);
      }
      if (shouldIndent(grandparentNode)) return indent(document);
      if (node === grandparentNode.rightOperand.variant) break;
      node = grandparentNode;
    }
    return document;
  };

export const printBinaryOperation = createBinaryOperationPrinter(
  binaryGroupRulesBuilder(() => false), // Don't force grouping
  binaryIndentRulesBuilder(() => false) // Don't force indentation
);
