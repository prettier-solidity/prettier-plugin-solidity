import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printSeparatedItem } from '../slang-printers/print-separated-item.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, StrictAstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

const { group, hardline, ifBreak, indent, line, softline } = doc.builders;

function fillTab({ useTabs, tabWidth }: ParserOptions<AstNode>): Doc {
  if (useTabs) return '\t';
  // For the odd case of `tabWidth` of 1 or 0 we initiate `fillTab` as a single
  // space.
  return tabWidth > 2 ? ' '.repeat(tabWidth - 1) : ' ';
}

function experimentalTernaries(
  node: ConditionalExpression,
  path: AstPath<ConditionalExpression>,
  print: PrintFunction,
  options: ParserOptions<AstNode>
): Doc {
  const grandparent = path.grandparent as StrictAstNode;
  const isNested = grandparent.kind === NonterminalKind.ConditionalExpression;
  const isNestedAsTrueExpression =
    isNested && grandparent.trueExpression.variant === node;
  const falseExpressionInSameLine =
    node.falseExpression.variant.kind === NonterminalKind.TupleExpression ||
    node.falseExpression.variant.kind === NonterminalKind.ConditionalExpression;

  // If the `condition` breaks into multiple lines, we add parentheses,
  // unless it already is a `TupleExpression`.
  const operand = path.call(print, 'operand');
  const operandDoc = group([
    node.operand.variant.kind === NonterminalKind.TupleExpression
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

  const falseExpression = path.call(print, 'falseExpression');
  const falseExpressionDoc = [
    isNested ? hardline : line,
    ':',
    falseExpressionInSameLine
      ? [' ', falseExpression]
      : ifBreak(
          [fillTab(options), indent(falseExpression)],
          [' ', falseExpression],
          // We only add `fillTab` if we are sure the trueExpression is
          // indented.
          { groupId }
        )
  ];

  const document = group([conditionAndTrueExpressionGroup, falseExpressionDoc]);

  return grandparent.kind === NonterminalKind.VariableDeclarationValue
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
      (path.grandparent as StrictAstNode).kind ===
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

export class ConditionalExpression implements SlangNode {
  readonly kind = NonterminalKind.ConditionalExpression;

  comments;

  loc;

  operand: Expression;

  trueExpression: Expression;

  falseExpression: Expression;

  constructor(ast: ast.ConditionalExpression, options: ParserOptions<AstNode>) {
    let metadata = getNodeMetadata(ast);

    this.operand = new Expression(ast.operand, options);
    this.trueExpression = new Expression(ast.trueExpression, options);
    this.falseExpression = new Expression(ast.falseExpression, options);

    metadata = updateMetadata(metadata, [
      this.operand,
      this.trueExpression,
      this.falseExpression
    ]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;

    if (options.experimentalTernaries) {
      // We can remove parentheses only because we are sure that the
      // `condition` must be a single `bool` value.
      const operandLoc = this.operand.loc;
      while (
        this.operand.variant.kind === NonterminalKind.TupleExpression &&
        this.operand.variant.items.items.length === 1 &&
        this.operand.variant.items.items[0].expression!.variant.kind !==
          NonterminalKind.ConditionalExpression
      ) {
        this.operand = this.operand.variant.items.items[0].expression!;
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
