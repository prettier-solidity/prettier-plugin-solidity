import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { IdentifierPath } from './IdentifierPath.js';
import { UsingDeconstruction } from './UsingDeconstruction.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction } from '../types.d.ts';

function createNonterminalVariant(
  variant: ast.UsingClause['variant']
): UsingClause['variant'] {
  switch (variant.cst.kind) {
    case NonterminalKind.IdentifierPath:
      return new IdentifierPath(variant as ast.IdentifierPath);
    case NonterminalKind.UsingDeconstruction:
      return new UsingDeconstruction(variant as ast.UsingDeconstruction);
    default:
      throw new Error(`Unexpected variant: ${variant.cst.kind}`);
  }
}

export class UsingClause extends SlangNode {
  readonly kind = NonterminalKind.UsingClause;

  variant: IdentifierPath | UsingDeconstruction;

  constructor(ast: ast.UsingClause) {
    super(ast);

    this.variant = createNonterminalVariant(ast.variant);

    this.updateMetadata(this.variant);
  }

  print(path: AstPath<UsingClause>, print: PrintFunction): Doc {
    return path.call(print, 'variant');
  }
}
