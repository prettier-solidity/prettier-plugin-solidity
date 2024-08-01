import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { doc } from 'prettier';
import { createKindCheckFunction } from '../slang-utils/create-kind-check-function.js';
import { isBinaryOperation } from '../slang-utils/is-binary-operation.js';
import { createBinaryOperationPrinter } from './create-binary-operation-printer.js';

import type { AstPath, Doc } from 'prettier';
import type { AstNode, BinaryOperation } from '../types.js';

const { group, indent } = doc.builders;

const isStatementWithoutIndentedOperation = createKindCheckFunction([
  NonterminalKind.ReturnStatement,
  NonterminalKind.IfStatement,
  NonterminalKind.WhileStatement
]);

const comparisonIndentRulesBuilder =
  (path: AstPath<BinaryOperation>) =>
  (document: Doc): Doc => {
    let node = path.getNode() as AstNode;
    for (let i = 2; ; i += 2) {
      const grandparentNode = path.getNode(i) as AstNode;
      if (grandparentNode.kind === NonterminalKind.ExpressionStatement) {
        if (
          (path.getNode(i + 1) as AstNode).kind ===
          NonterminalKind.ForStatementCondition
        )
          break;
        else return indent(document);
      }
      if (isStatementWithoutIndentedOperation(grandparentNode)) break;
      if (!isBinaryOperation(grandparentNode)) return indent(document);
      if (node === grandparentNode.rightOperand.variant) break;
      node = grandparentNode;
    }
    return document;
  };

export const printComparisonOperation = createBinaryOperationPrinter(
  () =>
    (document: Doc): Doc =>
      group(document), // always group
  comparisonIndentRulesBuilder
);
