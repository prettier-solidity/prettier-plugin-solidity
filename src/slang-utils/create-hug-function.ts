import { NonterminalKind, TerminalKind } from '@nomicfoundation/slang/cst';
import { isBinaryOperation } from './is-binary-operation.js';
import { Expression } from '../slang-nodes/Expression.js';
import { TupleExpression } from '../slang-nodes/TupleExpression.js';
import { TupleValues } from '../slang-nodes/TupleValues.js';
import { TupleValue } from '../slang-nodes/TupleValue.js';

export function createHugFunction(
  huggableOperators: string[]
): (node: Expression) => Expression {
  const operators = new Set(huggableOperators);
  return (node: Expression): Expression => {
    if (
      node.variant.kind !== TerminalKind.Identifier &&
      isBinaryOperation(node.variant) &&
      operators.has(node.variant.operator)
    ) {
      const { loc } = node;

      return Object.assign(Object.create(Expression.prototype) as Expression, {
        kind: NonterminalKind.Expression,
        loc: { ...loc },
        comments: [],
        variant: Object.assign(
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
                ],
                separators: []
              }
            )
          }
        )
      });
    }

    return node;
  };
}
