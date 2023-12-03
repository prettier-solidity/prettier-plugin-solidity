import { doc } from 'prettier';
import { printSeparatedItem } from '../common/printer-helpers.js';

const { group, hardline, ifBreak, indent, line, softline } = doc.builders;

const experimentalTernaries = (node, path, print) => {
  const parent = path.getParentNode();
  const isNested = parent.type === 'Conditional';
  const isNestedAsTrueExpression = isNested && parent.trueExpression === node;

  // If the `conditionDoc` breaks into multiple lines, we add parentheses,
  // unless it already is a `TupleExpression`.
  const conditionDoc = path.call(print, 'condition');
  const conditionGroup = group([
    node.condition.type === 'TupleExpression'
      ? conditionDoc
      : ifBreak(['(', printSeparatedItem(conditionDoc), ')'], conditionDoc),
    ' ?'
  ]);

  // To switch between "case-style" and "curious" ternaries we force a new line
  // before a nested `trueExpression` if the current `Conditional` is also a
  // `trueExpression`.
  const trueExpressionDoc = indent([
    isNestedAsTrueExpression ? hardline : line,
    path.call(print, 'trueExpression')
  ]);

  // A nested `falseExpression` is always printed in a new line.
  const falseExpressionDoc = [
    isNested ? hardline : line,
    ': ',
    path.call(print, 'falseExpression')
  ];

  const document = group([
    group([conditionGroup, trueExpressionDoc]),
    falseExpressionDoc
  ]);

  return parent.type === 'VariableDeclarationStatement'
    ? indent([softline, document])
    : document;
};

const traditionalTernaries = (path, print) =>
  group([
    path.call(print, 'condition'),
    indent([
      // Nested trueExpression and falseExpression are always printed in a new
      // line
      path.getParentNode().type === 'Conditional' ? hardline : line,
      '? ',
      path.call(print, 'trueExpression'),
      line,
      ': ',
      path.call(print, 'falseExpression')
    ])
  ]);

export const Conditional = {
  print: ({ node, path, print, options }) =>
    options.experimentalTernaries
      ? experimentalTernaries(node, path, print)
      : traditionalTernaries(path, print)
};
