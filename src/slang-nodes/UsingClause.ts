const { NonterminalKind } = await import('@nomicfoundation/slang/cst');
import { SlangNode } from './SlangNode.js';
import { IdentifierPath } from './IdentifierPath.js';
import { UsingDeconstruction } from './UsingDeconstruction.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction } from '../types.d.ts';

export class UsingClause extends SlangNode {
  readonly kind = NonterminalKind.UsingClause;

  variant: IdentifierPath | UsingDeconstruction;

  constructor(ast: ast.UsingClause) {
    super(ast);

    switch (ast.variant.cst.kind) {
      case NonterminalKind.IdentifierPath:
        this.variant = new IdentifierPath(ast.variant as ast.IdentifierPath);
        break;
      case NonterminalKind.UsingDeconstruction:
        this.variant = new UsingDeconstruction(
          ast.variant as ast.UsingDeconstruction
        );
        break;
      default:
        throw new Error(`Unexpected variant: ${ast.variant.cst.kind}`);
    }

    this.updateMetadata(this.variant);
  }

  print(path: AstPath<UsingClause>, print: PrintFunction): Doc {
    return path.call(print, 'variant');
  }
}
