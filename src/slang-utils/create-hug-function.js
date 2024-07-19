import { Expression } from '../slang-nodes/Expression.js';
import { TupleExpression } from '../slang-nodes/TupleExpression.js';
import { TupleValues } from '../slang-nodes/TupleValues.js';
import { TupleValue } from '../slang-nodes/TupleValue.js';
import { isBinaryOperation } from './is-binary-operation.js';

export function createHugFunction(huggableOperators) {
  const operators = new Set(huggableOperators);
  return (node) => {
    if (
      isBinaryOperation(node.variant) &&
      operators.has(node.variant.operator)
    ) {
      const { loc } = node;

      return Object.create(Expression.prototype, {
        loc: { value: { ...loc } },
        variant: {
          value: Object.create(TupleExpression.prototype, {
            loc: { value: { ...loc } },
            openParen: { value: '(' },
            items: {
              value: Object.create(TupleValues.prototype, {
                loc: { value: { ...loc } },
                items: {
                  value: [
                    Object.create(TupleValue.prototype, {
                      loc: { value: { ...loc } },
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
