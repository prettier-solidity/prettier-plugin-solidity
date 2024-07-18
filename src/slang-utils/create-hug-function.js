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

      return new Expression({
        loc: { ...loc },
        variant: new TupleExpression({
          loc: { ...loc },
          openParen: '(',
          items: new TupleValues({
            loc: { ...loc },
            items: [
              new TupleValue({
                loc: { ...loc },
                expression: node
              })
            ],
            separators: []
          }),
          closeParen: ')'
        })
      });
    }

    return node;
  };
}
