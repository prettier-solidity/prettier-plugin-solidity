/* eslint-disable no-nested-ternary */
import { doc } from 'prettier';
import { printSeparatedItem } from '../common/printer-helpers.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';

const { group, hardline, ifBreak, indent, line, softline } = doc.builders;

function experimentalTernaries(node, path, print, options) {
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
    { id: Symbol('Slang.ConditionalExpression.trueExpression') }
  );

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
  const falseExpressionDoc = [
    isNested ? hardline : line,
    node.colon,
    falseExpressionInSameLine
      ? [' ', falseExpression]
      : ifBreak([fillTab, indent(falseExpression)], [' ', falseExpression], {
          // We only add `fillTab` if we are sure the trueExpression is indented
          groupId: conditionAndTrueExpressionGroup.id
        })
  ];

  const document = group([conditionAndTrueExpressionGroup, falseExpressionDoc]);

  return grandparent.kind === 'VariableDeclarationValue'
    ? group(indent([softline, document]))
    : document;
}

function traditionalTernaries(node, path, print) {
  return group([
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
}

export class ConditionalExpression extends SlangNode {
  operand;

  questionMark;

  trueExpression;

  colon;

  falseExpression;

  constructor(ast, offset, options) {
    super();

    const fetch = (childrenOffsets) => ({
      operand: new Expression(ast.operand, childrenOffsets.shift(), options),
      questionMark: ast.questionMark.text,
      trueExpression: new Expression(
        ast.trueExpression,
        childrenOffsets.shift(),
        options
      ),
      colon: ast.colon.text,
      falseExpression: new Expression(
        ast.falseExpression,
        childrenOffsets.shift(),
        options
      )
    });

    this.initialize(ast, offset, fetch);

    // TODO: while the behaviour is not stable, it should be behind the
    // experimentalTernaries flag.
    if (options.experimentalTernaries) {
      // We can remove parentheses only because we are sure that the
      // `condition` must be a single `bool` value.
      const operandLoc = this.operand.loc;
      while (
        this.operand.variant.kind === 'TupleExpression' &&
        this.operand.variant.items.items.length === 1 &&
        this.operand.variant.items.items[0].expression.variant.kind !==
          'ConditionalExpression'
      ) {
        this.operand = this.operand.variant.items.items[0].expression;
      }

      this.operand.loc = operandLoc;
    }
  }

  print(path, print, options) {
    return options.experimentalTernaries
      ? experimentalTernaries(this, path, print, options)
      : traditionalTernaries(this, path, print);
  }
}
