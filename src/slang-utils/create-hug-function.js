import { Expression } from '../slang-nodes/Expression.js';
import { TupleExpression } from '../slang-nodes/TupleExpression.js';
import { TupleValues } from '../slang-nodes/TupleValues.js';
import { TupleValue } from '../slang-nodes/TupleValue.js';
import { isBinaryOperation } from './is-binary-operation.js';
import { Loc } from './loc.js';

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
        loc: new Loc(loc),
        variant: new TupleExpression({
          kind: 'TupleExpression',
          loc: new Loc(loc),
          openParen: '(',
          items: new TupleValues({
            kind: 'TupleValues',
            loc: new Loc(loc),
            items: [
              new TupleValue({
                kind: 'TupleValue',
                loc: new Loc(loc),
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
