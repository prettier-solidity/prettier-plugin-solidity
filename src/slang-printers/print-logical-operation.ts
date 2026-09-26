import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { isBinaryOperation } from '../slang-utils/is-binary-operation.ts';
import { indent } from './prettier-builders.ts';
import { createBinaryOperationPrinter } from './create-binary-operation-printer.ts';
import {
  binaryGroupRulesBuilder,
  shouldNotIndent
} from './print-binary-operation.ts';

import type { AstPath, Doc } from 'prettier';
import type { BinaryOperation, PrintableNode } from '../slang-nodes/types.d.ts';

const logicalGroupRulesBuilder = binaryGroupRulesBuilder(() => false);

const logicalIndentRulesBuilder =
  (node: BinaryOperation, path: AstPath<PrintableNode>) =>
  (document: Doc): Doc => {
    // `path.getNode(i)` is only `null` past the document root. This loop
    // always breaks or returns at or before reaching it, since the root is
    // never a BinaryOperation and never matches `shouldNotIndent`.
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
