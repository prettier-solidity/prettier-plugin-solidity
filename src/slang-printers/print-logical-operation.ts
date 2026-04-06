import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { isBinaryOperation } from '../slang-utils/is-binary-operation.js';
import { createBinaryOperationPrinter } from './create-binary-operation-printer.js';
import {
  binaryGroupRulesBuilder,
  shouldNotIndent
} from './print-binary-operation.js';

import type { AstPath, Doc } from 'prettier';
import type { BinaryOperation, PrintableNode } from '../slang-nodes/types.d.ts';

const { indent } = doc.builders;

const logicalGroupRulesBuilder = binaryGroupRulesBuilder(() => false);

const logicalIndentRulesBuilder =
  (node: BinaryOperation, path: AstPath<PrintableNode>) =>
  (document: Doc): Doc => {
    for (let i = 1, current = node, parent; ; i++, current = parent) {
      parent = path.getNode(i)!;
      if (shouldNotIndent(parent, path, i)) break;
      if (
        parent.kind === NonterminalKind.ConditionalExpression &&
        parent.operand === current
      )
        break;
      if (!isBinaryOperation(parent)) return indent(document);
      if (current === parent.rightOperand) break;
    }
    return document;
  };

export const printLogicalOperation = createBinaryOperationPrinter(
  logicalGroupRulesBuilder,
  logicalIndentRulesBuilder
);
