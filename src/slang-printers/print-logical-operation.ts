import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { doc } from 'prettier';
import { createKindCheckFunction } from '../slang-utils/create-kind-check-function.js';
import { isBinaryOperation } from '../slang-utils/is-binary-operation.js';
import { createBinaryOperationPrinter } from './create-binary-operation-printer.js';

import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from '../types.js';

const { group, indent } = doc.builders;

const isStatementWithoutIndentedOperation = createKindCheckFunction([
  NonterminalKind.ReturnStatement,
  NonterminalKind.IfStatement,
  NonterminalKind.WhileStatement
]);

const logicalGroupRulesBuilder =
  (path: AstPath) =>
  (document: Doc): Doc =>
    isBinaryOperation(path.getNode(2) as AstNode) ? document : group(document);

const logicalIndentRulesBuilder =
  (path: AstPath, options: ParserOptions<AstNode>) =>
  (document: Doc): Doc => {
    let node = path.getNode() as AstNode;
    for (let i = 2; ; i += 2) {
      const grandparentNode = path.getNode(i) as AstNode;
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
