/* eslint-disable no-nested-ternary */
import { doc } from 'prettier';
import { printSeparatedItem } from '../common/printer-helpers.js';

const { group, hardline, ifBreak, indent, line } = doc.builders;

let groupIndex = 0;
const experimentalTernaries = (node, path, print, options) => {
  const grandparent = path.getNode(2);
  const isNested = grandparent.kind === 'ConditionalExpression';
  const isNestedAsTrueExpression =
    isNested && grandparent.trueExpression.variant === node;
  const falseExpressionIsTuple =
    node.falseExpression.variant.kind === 'TupleExpression';
  const falseExpressionInSameLine =
    falseExpressionIsTuple ||
    node.falseExpression.variant.kind === 'ConditionalExpression';

  // If the `condition` breaks into multiple lines, we add parentheses,
  // unless it already is a `TupleExpression`.
  const operand = path.call(print, 'operand');
  const operandDoc = group([
    node.operand.variant.kind === 'TupleExpression'
      ? operand
      : ifBreak(['(', printSeparatedItem(operand), ')'], operand),
    ` ${node.questionMark}`
  ]);

  // To switch between "case-style" and "curious" ternaries we force a new line
  // before a nested `trueExpression` if the current `Conditional` is also a
  // `trueExpression`.
  const trueExpressionDoc = indent([
    isNestedAsTrueExpression ? hardline : line,
    path.call(print, 'trueExpression')
  ]);

  const conditionAndTrueExpressionGroup = group(
    [operandDoc, trueExpressionDoc],
    { id: Symbol(`Slang.ConditionalExpression.trueExpression-${groupIndex}`) }
  );

  groupIndex += 1;

  // For the odd case of `tabWidth` of 1 or 0 we initiate `fillTab` as a single
  // space.
  let fillTab = ' ';
  if (
    !falseExpressionInSameLine && // avoid processing if it's not needed
    (options.tabWidth > 2 || options.useTabs)
  ) {
    fillTab = options.useTabs ? '\t' : ' '.repeat(options.tabWidth - 1);
  }

  const falseExpression = path.call(print, 'falseExpression');
  return group([
    conditionAndTrueExpressionGroup,
    [
      falseExpressionIsTuple
        ? ifBreak(line, ' ', { groupId: conditionAndTrueExpressionGroup.id })
        : isNested
          ? hardline
          : line,
      node.colon,
      falseExpressionInSameLine
        ? [' ', falseExpression]
        : ifBreak([fillTab, indent(falseExpression)], [' ', falseExpression], {
            // We only add `fillTab` if we are sure the trueExpression is indented
            groupId: conditionAndTrueExpressionGroup.id
          })
    ]
  ]);
};

const traditionalTernaries = (node, path, print) =>
  group([
    path.call(print, 'operand'),
    indent([
      // Nested trueExpression and falseExpression are always printed in a new
      // line
      path.getNode(2).kind === 'ConditionalExpression' ? hardline : line,
      `${node.questionMark} `,
      path.call(print, 'trueExpression'),
      line,
      `${node.colon} `,
      path.call(print, 'falseExpression')
    ])
  ]);

export const ConditionalExpression = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    operand: parse(ast.operand, options, parse),
    questionMark: ast.questionMark.text,
    trueExpression: parse(ast.trueExpression, options, parse),
    colon: ast.colon.text,
    falseExpression: parse(ast.falseExpression, options, parse)
  }),
  print: ({ node, path, print, options }) =>
    options.experimentalTernaries
      ? experimentalTernaries(node, path, print, options)
      : traditionalTernaries(node, path, print)
};
