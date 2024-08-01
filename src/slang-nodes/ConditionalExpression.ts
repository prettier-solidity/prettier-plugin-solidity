/* eslint-disable no-nested-ternary */
import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { printSeparatedItem } from '../slang-printers/print-separated-item.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, SlangNode } from '../types.js';

const { group, hardline, ifBreak, indent, line, softline } = doc.builders;

function experimentalTernaries(
  node: ConditionalExpression,
  path: AstPath<ConditionalExpression>,
  print: (path: AstPath<AstNode>) => Doc,
  options: ParserOptions<AstNode>
): Doc {
  const grandparent = path.getNode(2) as AstNode;
  const isNested = grandparent.kind === NonterminalKind.ConditionalExpression;
  const isNestedAsTrueExpression =
    isNested && grandparent.trueExpression.variant === node;
  let falseExpressionIsTuple = false;
  let falseExpressionInSameLine = false;
  if (typeof node.falseExpression.variant !== 'string') {
    falseExpressionIsTuple =
      node.falseExpression.variant.kind === NonterminalKind.TupleExpression;
    falseExpressionInSameLine =
      falseExpressionIsTuple ||
      node.falseExpression.variant.kind ===
        NonterminalKind.ConditionalExpression;
  }

  // If the `condition` breaks into multiple lines, we add parentheses,
  // unless it already is a `TupleExpression`.
  const operand = path.call(print, 'operand');
  const operandDoc = group([
    typeof node.operand.variant !== 'string' &&
    node.operand.variant.kind === NonterminalKind.TupleExpression
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

  return grandparent.kind === NonterminalKind.VariableDeclarationValue
    ? group(indent([softline, document]))
    : document;
}

function traditionalTernaries(
  node: ConditionalExpression,
  path: AstPath<ConditionalExpression>,
  print: (path: AstPath<AstNode>) => Doc
): Doc {
  return group([
    path.call(print, 'operand'),
    indent([
      // Nested trueExpression and falseExpression are always printed in a new
      // line
      (path.getNode(2) as AstNode).kind ===
      NonterminalKind.ConditionalExpression
        ? hardline
        : line,
      `${node.questionMark} `,
      path.call(print, 'trueExpression'),
      line,
      `${node.colon} `,
      path.call(print, 'falseExpression')
    ])
  ]);
}

export class ConditionalExpression implements SlangNode {
  readonly kind = NonterminalKind.ConditionalExpression;

  comments;

  loc;

  operand: Expression;

  questionMark: string;

  trueExpression: Expression;

  colon: string;

  falseExpression: Expression;

  constructor(
    ast: ast.ConditionalExpression,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.operand = new Expression(ast.operand, offsets[0], options);
    this.questionMark = ast.questionMark.text;
    this.trueExpression = new Expression(
      ast.trueExpression,
      offsets[1],
      options
    );
    this.colon = ast.colon.text;
    this.falseExpression = new Expression(
      ast.falseExpression,
      offsets[2],
      options
    );

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
        typeof this.operand.variant !== 'string' &&
        this.operand.variant.kind === NonterminalKind.TupleExpression &&
        this.operand.variant.items.items.length === 1 &&
        (typeof this.operand.variant.items.items[0].expression!.variant ===
          'string' ||
          this.operand.variant.items.items[0].expression!.variant.kind !==
            NonterminalKind.ConditionalExpression)
      ) {
        this.operand = this.operand.variant.items.items[0].expression!;
      }
      this.operand.loc = operandLoc;
    }
  }

  print(
    path: AstPath<ConditionalExpression>,
    print: (path: AstPath<AstNode>) => Doc,
    options: ParserOptions<AstNode>
  ): Doc {
    return options.experimentalTernaries
      ? experimentalTernaries(this, path, print, options)
      : traditionalTernaries(this, path, print);
  }
}
