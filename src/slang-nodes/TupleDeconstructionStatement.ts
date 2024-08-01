import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { TupleDeconstructionElements } from './TupleDeconstructionElements.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, SlangNode } from '../types.js';

const { group, indent, line } = doc.builders;

export class TupleDeconstructionStatement implements SlangNode {
  readonly kind = NonterminalKind.TupleDeconstructionStatement;

  comments;

  loc;

  varKeyword?: string;

  openParen: string;

  elements: TupleDeconstructionElements;

  closeParen: string;

  equal: string;

  expression: Expression;

  semicolon: string;

  constructor(
    ast: ast.TupleDeconstructionStatement,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.varKeyword = ast.varKeyword?.text;
    this.openParen = ast.openParen.text;
    this.elements = new TupleDeconstructionElements(
      ast.elements,
      offsets[0],
      options
    );
    this.closeParen = ast.closeParen.text;
    this.equal = ast.equal.text;
    this.expression = new Expression(ast.expression, offsets[1], options);
    this.semicolon = ast.semicolon.text;

    metadata = updateMetadata(metadata, [this.elements, this.expression]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(
    path: AstPath<TupleDeconstructionStatement>,
    print: (path: AstPath<AstNode>) => Doc
  ): Doc {
    return [
      this.varKeyword ? this.varKeyword : '',
      this.openParen,
      path.call(print, 'elements'),
      typeof this.expression.variant !== 'string' &&
      this.expression.variant.kind === NonterminalKind.TupleExpression
        ? [`${this.closeParen} ${this.equal} `, path.call(print, 'expression')]
        : group([
            `${this.closeParen} ${this.equal}`,
            indent([line, path.call(print, 'expression'), this.semicolon])
          ])
    ];
  }
}
