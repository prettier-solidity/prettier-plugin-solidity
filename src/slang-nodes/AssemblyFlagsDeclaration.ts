import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { AssemblyFlags } from './AssemblyFlags.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class AssemblyFlagsDeclaration implements SlangNode {
  readonly kind = NonterminalKind.AssemblyFlagsDeclaration;

  comments;

  loc;

  flags: AssemblyFlags;

  constructor(
    ast: ast.AssemblyFlagsDeclaration,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast);

    this.flags = new AssemblyFlags(ast.flags, options);

    metadata = updateMetadata(metadata, [this.flags]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<AssemblyFlagsDeclaration>, print: PrintFunction): Doc {
    return ['(', path.call(print, 'flags'), ')'];
  }
}
