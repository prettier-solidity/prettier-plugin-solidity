import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { AssemblyFlags } from './AssemblyFlags.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, SlangNode } from '../types';

export class AssemblyFlagsDeclaration implements SlangNode {
  readonly kind = NonterminalKind.AssemblyFlagsDeclaration;

  comments;

  loc;

  flags: AssemblyFlags;

  constructor(
    ast: ast.AssemblyFlagsDeclaration,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.flags = new AssemblyFlags(ast.flags, offsets[0], options);

    metadata = updateMetadata(metadata, [this.flags]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(
    path: AstPath<AssemblyFlagsDeclaration>,
    print: (path: AstPath<AstNode>) => Doc
  ): Doc {
    return ['(', path.call(print, 'flags'), ')'];
  }
}
