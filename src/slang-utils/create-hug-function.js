import { isBinaryOperation } from '../common/slang-helpers.js';
import { Expression } from '../slang-nodes/Expression.js';
import { TupleExpression } from '../slang-nodes/TupleExpression.js';
import { TupleValues } from '../slang-nodes/TupleValues.js';
import { TupleValue } from '../slang-nodes/TupleValue.js';

export function createHugFunction(huggableOperators) {
  const operators = new Set(huggableOperators);
  return (node) => {
    if (isBinaryOperation(node.variant) && operators.has(node.variant.operator))
      return new Expression({
        kind: 'Expression',
        loc: { ...node.loc },
        variant: new TupleExpression({
          kind: 'TupleExpression',
          loc: { ...node.loc },
          openParen: '(',
          items: new TupleValues({
            kind: 'TupleValues',
            loc: { ...node.loc },
            items: [
              new TupleValue({
                kind: 'TupleValue',
                loc: { ...node.loc },
                expression: node
              })
            ],
            separators: []
          }),
          closeParen: ')'
        })
      });
    return node;
  };
}
