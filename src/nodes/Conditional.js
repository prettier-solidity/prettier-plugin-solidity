import { doc } from 'prettier';
import { printSeparatedItem } from '../common/printer-helpers.js';

const { group, hardline, ifBreak, indent, line } = doc.builders;

const experimentalTernaries = (node, path, print) => {
  const parent = path.getParentNode();
  const isNested = parent.type === 'Conditional';
  const isNestedAsTrueExpression = isNested && parent.trueExpression === node;
  const hasNestedConditional =
    node.trueExpression.type === 'Conditional' ||
    node.falseExpression.type === 'Conditional';

  // If the `conditionDoc` breaks into multiple lines, we add parentheses,
  // unless it already is a `TupleExpression`.
  const conditionDoc = path.call(print, 'condition');
  const conditionGroup = group([
    node.condition.type === 'TupleExpression'
      ? conditionDoc
      : ifBreak(['(', printSeparatedItem(conditionDoc), ')'], conditionDoc),
    ' ?'
  ]);

  // To switch between "case-style" and "curious" ternaries we force a
  // `hardline` without propagating the break thus keeping "case-style"
  // ternaries in the parent `Conditional`s.
  const trueExpressionDoc = indent([
    isNestedAsTrueExpression ? hardline : line,
    path.call(print, 'trueExpression')
  ]);

  // We force a new line if current `Conditional` is nested or nests a
  // `Conditional`. Otherwise we add a normal line.
  const falseExpressionDoc = [
    isNested || hasNestedConditional ? hardline : line,
    ': ',
    path.call(print, 'falseExpression')
  ];

  const document = group([
    group([conditionGroup, trueExpressionDoc]),
    falseExpressionDoc
  ]);

  return parent.type === 'VariableDeclarationStatement'
    ? ifBreak(indent([line, document]), document)
    : document;
};

const traditionalTernaries = (path, print) =>
  group([
    path.call(print, 'condition'),
    indent([
      // We force line breaks if it's a nested `Conditional`
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
