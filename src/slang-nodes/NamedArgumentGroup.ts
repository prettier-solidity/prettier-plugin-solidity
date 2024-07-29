import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/get-offsets.js';
import { NamedArguments } from './NamedArguments.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { SlangNode } from '../types.js';

export class NamedArgumentGroup implements SlangNode {
  readonly kind = NonterminalKind.NamedArgumentGroup;

  comments;

  loc;

  openBrace: string;

  arguments: NamedArguments;

  closeBrace: string;

  constructor(
    ast: ast.NamedArgumentGroup,
    offset: number,
    options: ParserOptions
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.openBrace = ast.openBrace.text;
    this.arguments = new NamedArguments(ast.arguments, offsets[0], options);
    this.closeBrace = ast.closeBrace.text;

    metadata = updateMetadata(metadata, [this.arguments]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath, print: (path: AstPath) => Doc): Doc {
    return [this.openBrace, path.call(print, 'arguments'), this.closeBrace];
  }
}
