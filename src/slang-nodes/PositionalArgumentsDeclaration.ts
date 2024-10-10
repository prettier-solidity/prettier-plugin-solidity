import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { PositionalArguments } from './PositionalArguments.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './index.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class PositionalArgumentsDeclaration implements SlangNode {
  readonly kind = NonterminalKind.PositionalArgumentsDeclaration;

  comments;

  loc;

  arguments: PositionalArguments;

  constructor(
    ast: ast.PositionalArgumentsDeclaration,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.arguments = new PositionalArguments(
      ast.arguments,
      offsets[0],
      options
    );

    metadata = updateMetadata(metadata, [this.arguments]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(
    path: AstPath<PositionalArgumentsDeclaration>,
    print: PrintFunction
  ): Doc {
    return ['(', path.call(print, 'arguments'), ')'];
  }
}
