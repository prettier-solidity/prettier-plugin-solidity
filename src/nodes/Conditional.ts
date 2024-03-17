import { doc } from 'prettier';
import { printSeparatedItem } from '../common/printer-helpers.js';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { Conditional as IConditional } from '@solidity-parser/parser/src/ast-types';
import type { NodePrinter } from './types';

const { group, hardline, ifBreak, indent, line, softline } = doc.builders;

let groupIndex = 0;
const experimentalTernaries = (
  node: IConditional,
  path: AstPath,
  print: (path: AstPath) => Doc,
  options: ParserOptions
): Doc => {
  const parent = path.getParentNode();
  const isNested = parent.type === 'Conditional';
  const isNestedAsTrueExpression = isNested && parent.trueExpression === node;
  const falseExpressionIsNested = node.falseExpression.type === 'Conditional';

  // If the `condition` breaks into multiple lines, we add parentheses,
  // unless it already is a `TupleExpression`.
  const condition = path.call(print, 'condition');
  const conditionDoc = group([
    node.condition.type === 'TupleExpression'
      ? condition
      : ifBreak(['(', printSeparatedItem(condition), ')'], condition),
    ' ?'
  ]);

  // To switch between "case-style" and "curious" ternaries we force a new line
  // before a nested `trueExpression` if the current `Conditional` is also a
  // `trueExpression`.
  const trueExpressionDoc = indent([
    isNestedAsTrueExpression ? hardline : line,
    path.call(print, 'trueExpression')
  ]);

  const conditionAndTrueExpressionGroup = group(
    [conditionDoc, trueExpressionDoc],
    { id: Symbol(`Conditional.trueExpressionDoc-${groupIndex}`) }
  );

  groupIndex += 1;

  // For the odd case of `tabWidth` of 1 or 0 we initiate `fillTab` as a single
  // space.
  let fillTab = ' ';
  if (
    !falseExpressionIsNested && // avoid processing if it's not needed
    (options.tabWidth > 2 || options.useTabs)
  ) {
    fillTab = options.useTabs ? '\t' : ' '.repeat(options.tabWidth - 1);
  }

  // A nested `falseExpression` is always printed in a new line.
  const falseExpression = path.call(print, 'falseExpression');
  const falseExpressionDoc = [
    isNested ? hardline : line,
    ':',
    falseExpressionIsNested
      ? [' ', falseExpression]
      : ifBreak([fillTab, indent(falseExpression)], [' ', falseExpression], {
          // We only add `fillTab` if we are sure the trueExpression is indented
          groupId: conditionAndTrueExpressionGroup.id
        })
  ];

  const document = group([conditionAndTrueExpressionGroup, falseExpressionDoc]);

  return parent.type === 'VariableDeclarationStatement'
    ? indent([softline, document])
    : document;
};

const traditionalTernaries = (
  path: AstPath,
  print: (path: AstPath) => Doc
): Doc =>
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

export const Conditional: NodePrinter<IConditional> = {
  print: ({ node, path, print, options }) =>
    options.experimentalTernaries
      ? experimentalTernaries(node, path, print, options)
      : traditionalTernaries(path, print)
};
