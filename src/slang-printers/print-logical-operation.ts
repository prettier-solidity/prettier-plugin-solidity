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
    for (let i = 1, node = path.node; ; i++) {
      const parent = path.getNode(i) as StrictAstNode;
      if (shouldNotIndent(parent, path, i)) break;
      if (
        options.experimentalTernaries &&
        parent.kind === NonterminalKind.ConditionalExpression &&
        parent.operand === node
      )
        break;
      if (!isBinaryOperation(parent)) return indent(document);
      if (node === parent.rightOperand) break;
      node = parent;
    }
    return document;
  };

export const printLogicalOperation = createBinaryOperationPrinter(
  logicalGroupRulesBuilder,
  logicalIndentRulesBuilder
);
