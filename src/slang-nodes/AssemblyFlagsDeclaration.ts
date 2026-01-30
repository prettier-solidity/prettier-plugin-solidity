import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { AssemblyFlags } from './AssemblyFlags.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class AssemblyFlagsDeclaration extends SlangNode {
  readonly kind = NonterminalKind.AssemblyFlagsDeclaration;

  flags: AssemblyFlags;

  constructor(
    ast: ast.AssemblyFlagsDeclaration,
    collected: CollectedMetadata,
    options: ParserOptions<AstNode>
  ) {
    super(ast, collected);

    this.flags = new AssemblyFlags(ast.flags, collected, options);

    this.updateMetadata(this.flags);
  }

  print(path: AstPath<AssemblyFlagsDeclaration>, print: PrintFunction): Doc {
    return ['(', path.call(print, 'flags'), ')'];
  }
}
