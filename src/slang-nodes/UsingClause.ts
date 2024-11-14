import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { IdentifierPath } from './IdentifierPath.js';
import { UsingDeconstruction } from './UsingDeconstruction.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class UsingClause implements SlangNode {
  readonly kind = NonterminalKind.UsingClause;

  comments;

  loc;

  variant: IdentifierPath | UsingDeconstruction;

  constructor(ast: ast.UsingClause) {
    let metadata = getNodeMetadata(ast);

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

    metadata = updateMetadata(metadata, [this.variant]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<UsingClause>, print: PrintFunction): Doc {
    return path.call(print, 'variant');
  }
}
