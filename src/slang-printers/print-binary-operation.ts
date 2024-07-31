import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { doc } from 'prettier';
import { createBinaryOperationPrinter } from './create-binary-operation-printer.js';
import { createKindCheckFunction } from '../slang-utils/create-kind-check-function.js';

import type { AstPath, Doc } from 'prettier';
import type { AstNode, BinaryOperation } from '../types.js';

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
]) as (node: AstNode | Comment | Node) => node is BinaryOperation;

const binaryGroupRulesBuilder =
  (path: AstPath) =>
  (document: Doc): Doc => {
    const grandparentNode = path.getNode(2) as AstNode;
    if (isBinaryOperationWithoutComparison(grandparentNode)) {
      return document;
    }
    return group(document);
  };

const binaryIndentRulesBuilder =
  (path: AstPath) =>
  (document: Doc): Doc => {
    let node = path.getNode() as AstNode;
    for (let i = 2; ; i += 2) {
      const grandparentNode = path.getNode(i) as AstNode;
      if (grandparentNode.kind === NonterminalKind.ReturnStatement) break;
      if (!isBinaryOperationWithoutComparison(grandparentNode)) {
        return indent(document);
      }
      if (node === grandparentNode.rightOperand.variant) break;
      node = grandparentNode;
    }
    return document;
  };

export const printBinaryOperation = createBinaryOperationPrinter(
  binaryGroupRulesBuilder,
  binaryIndentRulesBuilder
);
