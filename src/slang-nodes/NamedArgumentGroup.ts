import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { NamedArguments } from './NamedArguments.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, SlangNode } from '../types';

export class NamedArgumentGroup implements SlangNode {
  readonly kind = NonterminalKind.NamedArgumentGroup;

  comments;

  loc;

  arguments: NamedArguments;

  constructor(
    ast: ast.NamedArgumentGroup,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.arguments = new NamedArguments(ast.arguments, offsets[0], options);

    metadata = updateMetadata(metadata, [this.arguments]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(
    path: AstPath<NamedArgumentGroup>,
    print: (path: AstPath<AstNode>) => Doc
  ): Doc {
    return ['{', path.call(print, 'arguments'), '}'];
  }
}
