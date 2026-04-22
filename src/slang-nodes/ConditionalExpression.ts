import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { printSeparatedItem } from '../slang-printers/print-separated-item.js';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { PrintableNode } from './types.d.ts';

const { group, hardline, ifBreak, indent, line } = doc.builders;

function experimentalTernaries(
  node: ConditionalExpression,
  path: AstPath<PrintableNode>,
  print: PrintFunction,
  { useTabs, tabWidth }: ParserOptions<PrintableNode>
): Doc {
  const parent = path.parent!;
  const isNested = parent.kind === NonterminalKind.ConditionalExpression;
  const isNestedAsTrueExpression = isNested && parent.trueExpression === node;
  const falseExpressionVariantKind = node.falseExpression.kind;
  const falseExpressionInSameLine =
    falseExpressionVariantKind === NonterminalKind.TupleExpression ||
    falseExpressionVariantKind === NonterminalKind.ConditionalExpression;

  // If the `condition` breaks into multiple lines, we add parentheses,
  // unless it already is a `TupleExpression`.
  const operand = print('operand');
  const operandDoc = group([
    node.operand.kind === NonterminalKind.TupleExpression
      ? operand
      : ifBreak(['(', printSeparatedItem(operand), ')'], operand),
    ' ?'
  ]);

  // To switch between "case-style" and "curious" ternaries we force a new line
  // before a nested `trueExpression` if the current `Conditional` is also a
  // `trueExpression`.
  const trueExpressionDoc = indent([
    isNestedAsTrueExpression ? hardline : line,
    print('trueExpression')
  ]);

  const groupId = Symbol('Slang.ConditionalExpression.trueExpression');
  const conditionAndTrueExpressionGroup = group(
    [operandDoc, trueExpressionDoc],
    { id: groupId }
  );

  // For the odd case of `tabWidth` of 1 or 0 we initiate `fillTab` as a single
  // space.
  const fillTab = useTabs
    ? '\t'
    : tabWidth > 2
      ? ' '.repeat(tabWidth - 1)
      : ' ';

  const falseExpression = print('falseExpression');
  const falseExpressionDoc = [
    isNested ? hardline : line,
    ':',
    falseExpressionInSameLine
      ? [' ', falseExpression]
      : ifBreak(
          [fillTab, indent(falseExpression)],
          [' ', falseExpression],
          // We only add `fillTab` if we are sure the trueExpression is
          // indented.
          { groupId }
        )
  ];

  return group([conditionAndTrueExpressionGroup, falseExpressionDoc]);
}

function traditionalTernaries(
  path: AstPath<PrintableNode>,
  print: PrintFunction
): Doc {
  return group([
    print('operand'),
    indent([
      // Nested trueExpression and falseExpression are always printed in a new
      // line
      path.parent!.kind === NonterminalKind.ConditionalExpression
        ? hardline
        : line,
      '? ',
      print('trueExpression'),
      line,
      ': ',
      print('falseExpression')
    ])
  ]);
}

function getOperandSingleExpression(
  operand: Expression['variant']
): Expression['variant'] | undefined {
  return operand.kind === NonterminalKind.TupleExpression
    ? operand.items.getSingleExpression()
    : undefined;
}

export class ConditionalExpression extends SlangNode {
  readonly kind = NonterminalKind.ConditionalExpression;

  operand: Expression['variant'];

  trueExpression: Expression['variant'];

  falseExpression: Expression['variant'];

  constructor(ast: ast.ConditionalExpression, collected: CollectedMetadata) {
    super(ast, collected);

    this.operand = extractVariant(new Expression(ast.operand, collected));
    this.trueExpression = extractVariant(
      new Expression(ast.trueExpression, collected)
    );
    this.falseExpression = extractVariant(
      new Expression(ast.falseExpression, collected)
    );

    this.updateMetadata(
      this.operand,
      this.trueExpression,
      this.falseExpression
    );

    if (collected.options.experimentalTernaries) {
      // We can remove parentheses only because we are sure that the
      // `condition` must be a single `bool` value.
      const operandLoc = this.operand.loc;
      for (let operandSingleExpression; ; ) {
        operandSingleExpression = getOperandSingleExpression(this.operand);
        if (
          operandSingleExpression === undefined ||
          operandSingleExpression.kind === NonterminalKind.ConditionalExpression
        )
          break;

        this.operand = operandSingleExpression;
      }
      this.operand.loc = operandLoc;
    }
  }

  print(
    print: PrintFunction,
    path: AstPath<ConditionalExpression>,
    options: ParserOptions<PrintableNode>
  ): Doc {
    return options.experimentalTernaries
      ? experimentalTernaries(this, path, print, options)
      : traditionalTernaries(path, print);
  }
}
