import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { printSeparatedItem } from '../slang-printers/print-separated-item.js';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode, StrictAstNode } from './types.d.ts';

const { group, hardline, ifBreak, indent, line, softline } = doc.builders;

function experimentalTernaries(
  node: ConditionalExpression,
  path: AstPath<ConditionalExpression>,
  print: PrintFunction,
  { useTabs, tabWidth }: ParserOptions<AstNode>
): Doc {
  const parent = path.parent as StrictAstNode;
  const isNested = parent.kind === NonterminalKind.ConditionalExpression;
  const isNestedAsTrueExpression = isNested && parent.trueExpression === node;
  const falseExpressionVariantKind = node.falseExpression.kind;
  const falseExpressionInSameLine =
    falseExpressionVariantKind === NonterminalKind.TupleExpression ||
    falseExpressionVariantKind === NonterminalKind.ConditionalExpression;

  // If the `condition` breaks into multiple lines, we add parentheses,
  // unless it already is a `TupleExpression`.
  const operand = path.call(print, 'operand');
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
    path.call(print, 'trueExpression')
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

  const falseExpression = path.call(print, 'falseExpression');
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

  const document = group([conditionAndTrueExpressionGroup, falseExpressionDoc]);

  return parent.kind === NonterminalKind.VariableDeclarationValue
    ? group(indent([softline, document]))
    : document;
}

function traditionalTernaries(
  path: AstPath<ConditionalExpression>,
  print: PrintFunction
): Doc {
  return group([
    path.call(print, 'operand'),
    indent([
      // Nested trueExpression and falseExpression are always printed in a new
      // line
      (path.parent as StrictAstNode).kind ===
      NonterminalKind.ConditionalExpression
        ? hardline
        : line,
      '? ',
      path.call(print, 'trueExpression'),
      line,
      ': ',
      path.call(print, 'falseExpression')
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

  constructor(ast: ast.ConditionalExpression, options: ParserOptions<AstNode>) {
    super(ast);

    this.operand = extractVariant(new Expression(ast.operand, options));
    this.trueExpression = extractVariant(
      new Expression(ast.trueExpression, options)
    );
    this.falseExpression = extractVariant(
      new Expression(ast.falseExpression, options)
    );

    this.updateMetadata(
      this.operand,
      this.trueExpression,
      this.falseExpression
    );

    if (options.experimentalTernaries) {
      // We can remove parentheses only because we are sure that the
      // `condition` must be a single `bool` value.
      const operandLoc = this.operand.loc;
      for (
        let operandSingleExpression = getOperandSingleExpression(this.operand);
        operandSingleExpression &&
        operandSingleExpression.kind !== NonterminalKind.ConditionalExpression;
        operandSingleExpression = getOperandSingleExpression(this.operand)
      ) {
        this.operand = operandSingleExpression;
      }
      this.operand.loc = operandLoc;
    }
  }

  print(
    path: AstPath<ConditionalExpression>,
    print: PrintFunction,
    options: ParserOptions<AstNode>
  ): Doc {
    return options.experimentalTernaries
      ? experimentalTernaries(this, path, print, options)
      : traditionalTernaries(path, print);
  }
}
