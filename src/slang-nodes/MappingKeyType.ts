import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { ElementaryType } from './ElementaryType.js';
import { IdentifierPath } from './IdentifierPath.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction } from '../types.d.ts';

export class MappingKeyType extends SlangNode {
  readonly kind = NonterminalKind.MappingKeyType;

  variant: ElementaryType | IdentifierPath;

  constructor(ast: ast.MappingKeyType) {
    super(ast);

    const variant = ast.variant;
    const variantKind = variant.cst.kind;
    switch (variantKind) {
      case NonterminalKind.ElementaryType:
        this.variant = new ElementaryType(variant as ast.ElementaryType);
        break;
      case NonterminalKind.IdentifierPath:
        this.variant = new IdentifierPath(variant as ast.IdentifierPath);
        break;
      default:
        throw new Error(`Unexpected variant: ${variantKind}`);
    }

    this.updateMetadata(this.variant);
  }

  print(path: AstPath<MappingKeyType>, print: PrintFunction): Doc {
    return path.call(print, 'variant');
  }
}
