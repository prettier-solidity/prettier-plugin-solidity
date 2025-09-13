import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { InheritanceTypes } from './InheritanceTypes.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class InheritanceSpecifier extends SlangNode {
  readonly kind = NonterminalKind.InheritanceSpecifier;

  types: InheritanceTypes;

  constructor(ast: ast.InheritanceSpecifier, options: ParserOptions<AstNode>) {
    super(ast);

    this.types = new InheritanceTypes(ast.types, options);

    this.updateMetadata(this.types);
  }

  print(path: AstPath<InheritanceSpecifier>, print: PrintFunction): Doc {
    return ['is', path.call(print, 'types')];
  }
}
