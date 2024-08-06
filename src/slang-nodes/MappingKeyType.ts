import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { ElementaryType } from './ElementaryType.js';
import { IdentifierPath } from './IdentifierPath.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types';

export class MappingKeyType implements SlangNode {
  readonly kind = NonterminalKind.MappingKeyType;

  comments;

  loc;

  variant: ElementaryType | IdentifierPath;

  constructor(ast: ast.MappingKeyType, offset: number) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    switch (ast.variant.cst.kind) {
      case NonterminalKind.ElementaryType:
        this.variant = new ElementaryType(
          ast.variant as ast.ElementaryType,
          offsets[0]
        );
        break;
      case NonterminalKind.IdentifierPath:
        this.variant = new IdentifierPath(
          ast.variant as ast.IdentifierPath,
          offsets[0]
        );
        break;
      default:
        throw new Error(`Unexpected variant: ${ast.variant.cst.kind}`);
    }

    metadata = updateMetadata(metadata, [this.variant]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<MappingKeyType>, print: PrintFunction): Doc {
    return path.call(print, 'variant');
  }
}
