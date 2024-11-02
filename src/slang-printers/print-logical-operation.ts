import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { createKindCheckFunction } from '../slang-utils/create-kind-check-function.js';
import { isBinaryOperation } from '../slang-utils/is-binary-operation.js';
import { createBinaryOperationPrinter } from './create-binary-operation-printer.js';

import type { AstPath, Doc, ParserOptions } from 'prettier';
import type {
  AstNode,
  BinaryOperation,
  StrictAstNode
} from '../slang-nodes/types.d.ts';

const { group, indent } = doc.builders;

const isStatementWithoutIndentedOperation = createKindCheckFunction([
  NonterminalKind.ReturnStatement,
  NonterminalKind.IfStatement,
  NonterminalKind.WhileStatement
]);

const logicalGroupRulesBuilder =
  (path: AstPath<BinaryOperation>) =>
  (document: Doc): Doc =>
    isBinaryOperation(path.getNode(2) as StrictAstNode)
      ? document
      : group(document);

const logicalIndentRulesBuilder =
  (path: AstPath<BinaryOperation>, options: ParserOptions<AstNode>) =>
  (document: Doc): Doc => {
    let node = path.getNode() as StrictAstNode;
    for (let i = 2; ; i += 2) {
      const grandparentNode = path.getNode(i) as StrictAstNode;
      if (isStatementWithoutIndentedOperation(grandparentNode)) break;
      if (
        options.experimentalTernaries &&
        grandparentNode.kind === NonterminalKind.ConditionalExpression &&
        grandparentNode.operand.variant === node
      )
        break;
      if (!isBinaryOperation(grandparentNode)) return indent(document);
      if (node === grandparentNode.rightOperand.variant) break;
      node = grandparentNode;
    }
    return document;
  };

export const printLogicalOperation = createBinaryOperationPrinter(
  logicalGroupRulesBuilder,
  logicalIndentRulesBuilder
);
