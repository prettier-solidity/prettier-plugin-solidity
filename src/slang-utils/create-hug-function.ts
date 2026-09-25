import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { TupleExpression } from '../slang-nodes/TupleExpression.js';
import { TupleValues } from '../slang-nodes/TupleValues.js';
import { TupleValue } from '../slang-nodes/TupleValue.js';
import { isBinaryOperation } from './is-binary-operation.js';

import type { Expression } from '../slang-nodes/Expression.ts';

export function createHugFunction(
  huggableOperators: string[]
): (node: Expression['variant']) => Expression['variant'] {
  const operators = new Set(huggableOperators);
  return (node: Expression['variant']): Expression['variant'] => {
    if (isBinaryOperation(node) && operators.has(node.operator)) {
      const loc = node.loc;
      return TupleExpression.createSynthetic({
        kind: NonterminalKind.TupleExpression,
        loc: { ...loc },
        comments: undefined,
        items: TupleValues.createSynthetic({
          kind: NonterminalKind.TupleValues,
          loc: { ...loc },
          comments: undefined,
          items: [
            TupleValue.createSynthetic({
              kind: NonterminalKind.TupleValue,
              loc: { ...loc },
              comments: undefined,
              expression: node
            })
          ]
        })
      });
    }

    return node;
  };
}
