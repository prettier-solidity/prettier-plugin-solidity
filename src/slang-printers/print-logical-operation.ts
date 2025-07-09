import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { isBinaryOperation } from '../slang-utils/is-binary-operation.js';
import { createBinaryOperationPrinter } from './create-binary-operation-printer.js';
import {
  binaryGroupRulesBuilder,
  shouldNotIndent
} from './print-binary-operation.js';

import type { AstPath, Doc, ParserOptions } from 'prettier';
import type {
  AstNode,
  BinaryOperation,
  StrictAstNode
} from '../slang-nodes/types.d.ts';

const { indent } = doc.builders;

const logicalGroupRulesBuilder = binaryGroupRulesBuilder(() => false);

const logicalIndentRulesBuilder =
  (path: AstPath<BinaryOperation>, options: ParserOptions<AstNode>) =>
  (document: Doc): Doc => {
    for (let i = 2, node = path.node; ; i += 2) {
      const grandparentNode = path.getNode(i) as StrictAstNode;
      if (shouldNotIndent(grandparentNode, path, i)) break;
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
