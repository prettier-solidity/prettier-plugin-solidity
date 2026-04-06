import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { InheritanceTypes } from './InheritanceTypes.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { PrintableNode } from './types.d.ts';

export class InheritanceSpecifier extends SlangNode {
  readonly kind = NonterminalKind.InheritanceSpecifier;

  types: InheritanceTypes;

  constructor(
    ast: ast.InheritanceSpecifier,
    collected: CollectedMetadata,
    options: ParserOptions<PrintableNode>
  ) {
    super(ast, collected);

    this.types = new InheritanceTypes(ast.types, collected, options);

    this.updateMetadata(this.types);
  }

  print(print: PrintFunction): Doc {
    return ['is', print('types')];
  }
}
