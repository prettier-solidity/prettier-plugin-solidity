import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { AssemblyFlags } from './AssemblyFlags.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class AssemblyFlagsDeclaration extends SlangNode {
  readonly kind = NonterminalKind.AssemblyFlagsDeclaration;

  flags: AssemblyFlags;

  constructor(ast: ast.AssemblyFlagsDeclaration, collected: CollectedMetadata) {
    super(ast, collected);

    this.flags = new AssemblyFlags(ast.flags, collected);

    this.updateMetadata(this.flags);
  }

  print(print: PrintFunction): Doc {
    return ['(', print('flags'), ')'];
  }
}
