import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { Expression } from '../slang-nodes/Expression.js';
import { TupleExpression } from '../slang-nodes/TupleExpression.js';
import { TupleValues } from '../slang-nodes/TupleValues.js';
import { TupleValue } from '../slang-nodes/TupleValue.js';
import { isBinaryOperation } from './is-binary-operation.js';

const objectConfig = {
  writable: true,
  enumerable: true,
  configurable: true
};

export function createHugFunction(
  huggableOperators: string[]
): (node: Expression) => Expression {
  const operators = new Set(huggableOperators);
  return (node: Expression): Expression => {
    if (
      typeof node.variant !== 'string' &&
      isBinaryOperation(node.variant) &&
      operators.has(node.variant.operator)
    ) {
      const { loc } = node;

      return Object.create(Expression.prototype, {
        kind: { value: NonterminalKind.Expression, ...objectConfig },
        loc: { value: { ...loc }, ...objectConfig },
        comments: { value: [], ...objectConfig },
        variant: {
          value: Object.create(TupleExpression.prototype, {
            kind: { value: NonterminalKind.TupleExpression, ...objectConfig },
            loc: { value: { ...loc }, ...objectConfig },
            comments: { value: [], ...objectConfig },
            openParen: { value: '(', ...objectConfig },
            items: {
              value: Object.create(TupleValues.prototype, {
                kind: { value: NonterminalKind.TupleValues, ...objectConfig },
                loc: { value: { ...loc }, ...objectConfig },
                comments: { value: [], ...objectConfig },
                items: {
                  value: [
                    Object.create(TupleValue.prototype, {
                      kind: {
                        value: NonterminalKind.TupleValue,
                        ...objectConfig
                      },
                      loc: { value: { ...loc }, ...objectConfig },
                      comments: { value: [], ...objectConfig },
                      expression: { value: node, ...objectConfig }
                    }) as TupleValue
                  ],
                  ...objectConfig
                },
                separators: { value: [], ...objectConfig }
              }) as TupleValues,
              ...objectConfig
            },
            closeParen: { value: ')', ...objectConfig }
          }) as TupleExpression,
          ...objectConfig
        }
      }) as Expression;
    }

    return node;
  };
}
