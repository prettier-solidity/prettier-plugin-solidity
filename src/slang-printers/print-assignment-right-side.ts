import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { isChainableExpression } from '../slang-utils/is-chainable-expression.js';
import { printIndentedGroupOrSpacedDocument } from './print-indented-group-or-spaced-document.js';

import type { Doc, doc } from 'prettier';
import type { Expression } from '../slang-nodes/Expression.ts';

export function printAssignmentRightSide(
  document: Doc,
  value: Expression['variant']
): doc.builders.Group | [' ', Doc] {
  return printIndentedGroupOrSpacedDocument(
    document,
    value.kind !== NonterminalKind.ArrayExpression &&
      !isChainableExpression(value)
  );
}
