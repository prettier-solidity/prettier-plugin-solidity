import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { Expression } from '../slang-nodes/Expression.js';
import { TupleExpression } from '../slang-nodes/TupleExpression.js';
import { TupleValues } from '../slang-nodes/TupleValues.js';
import { TupleValue } from '../slang-nodes/TupleValue.js';
import { isBinaryOperation } from './is-binary-operation.js';

import type { BinaryOperation } from '../types.js';

export function createHugFunction(
  huggableOperators: string[]
): (node: Expression) => Expression {
  const operators = new Set(huggableOperators);
  return (node: Expression): Expression => {
    if (
      isBinaryOperation(node.variant) &&
      operators.has((node.variant as BinaryOperation).operator)
    ) {
      const { loc } = node;

      return Object.create(Expression.prototype, {
        kind: { value: NonterminalKind.Expression },
        loc: { value: { ...loc } },
        comments: { value: [] },
        variant: {
          value: Object.create(TupleExpression.prototype, {
            kind: { value: NonterminalKind.TupleExpression },
            loc: { value: { ...loc } },
            comments: { value: [] },
            openParen: { value: '(' },
            items: {
              value: Object.create(TupleValues.prototype, {
                kind: { value: NonterminalKind.TupleValues },
                loc: { value: { ...loc } },
                comments: { value: [] },
                items: {
                  value: [
                    Object.create(TupleValue.prototype, {
                      kind: { value: NonterminalKind.TupleValue },
                      loc: { value: { ...loc } },
                      comments: { value: [] },
                      expression: { value: node }
                    })
                  ]
                },
                separators: { value: [] }
              })
            },
            closeParen: { value: ')' }
          })
        }
      });
    }

    return node;
  };
}
