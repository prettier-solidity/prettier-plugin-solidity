import { isBinaryOperation } from '../common/slang-helpers.js';
import { Expression } from '../slang-nodes/Expression.js';
import { TupleExpression } from '../slang-nodes/TupleExpression.js';
import { TupleValues } from '../slang-nodes/TupleValues.js';
import { TupleValue } from '../slang-nodes/TupleValue.js';

export function createHugFunction(huggableOperators) {
  const operators = new Set(huggableOperators);
  return (node) => {
    if (
      isBinaryOperation(node.variant) &&
      operators.has(node.variant.operator)
    ) {
      const loc = {
        startWithTrivia: node.loc.startWithTrivia,
        start: node.loc.start,
        endWithTrivia: node.loc.endWithTrivia,
        end: node.loc.end
      };

      return new Expression({
        kind: 'Expression',
        loc: { ...loc },
        variant: new TupleExpression({
          kind: 'TupleExpression',
          loc: { ...loc },
          openParen: '(',
          items: new TupleValues({
            kind: 'TupleValues',
            loc: { ...loc },
            items: [
              new TupleValue({
                kind: 'TupleValue',
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
