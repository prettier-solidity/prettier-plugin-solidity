import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { TupleExpression } from '../slang-nodes/TupleExpression.js';
import { TupleValues } from '../slang-nodes/TupleValues.js';
import { TupleValue } from '../slang-nodes/TupleValue.js';
import { TerminalNode } from '../slang-nodes/TerminalNode.js';
import { isBinaryOperation } from './is-binary-operation.js';

import type { Expression } from '../slang-nodes/Expression.js';

export function createHugFunction(
  huggableOperators: string[]
): (node: Expression['variant']) => Expression['variant'] {
  const operators = new Set(huggableOperators);
  return (node: Expression['variant']): Expression['variant'] => {
    if (
      !(node instanceof TerminalNode) &&
      isBinaryOperation(node) &&
      operators.has(node.operator)
    ) {
      const loc = node.loc;
      return Object.assign(
        Object.create(TupleExpression.prototype) as TupleExpression,
        {
          kind: NonterminalKind.TupleExpression,
          loc: { ...loc },
          comments: [],
          items: Object.assign(
            Object.create(TupleValues.prototype) as TupleValues,
            {
              kind: NonterminalKind.TupleValues,
              loc: { ...loc },
              comments: [],
              items: [
                Object.assign(
                  Object.create(TupleValue.prototype) as TupleValue,
                  {
                    kind: NonterminalKind.TupleValue,
                    loc: { ...loc },
                    comments: [],
                    expression: node
                  }
                )
              ]
            }
          )
        }
      );
    }

    return node;
  };
}
