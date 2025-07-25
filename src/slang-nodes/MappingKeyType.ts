import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { ElementaryType } from './ElementaryType.js';
import { IdentifierPath } from './IdentifierPath.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction } from '../types.d.ts';

function createNonterminalVariant(
  variant: ast.MappingKeyType['variant']
): MappingKeyType['variant'] {
  switch (variant.cst.kind) {
    case NonterminalKind.ElementaryType:
      return new ElementaryType(variant as ast.ElementaryType);
    case NonterminalKind.IdentifierPath:
      return new IdentifierPath(variant as ast.IdentifierPath);
    default:
      throw new Error(`Unexpected variant: ${variant.cst.kind}`);
  }
}

export class MappingKeyType extends SlangNode {
  readonly kind = NonterminalKind.MappingKeyType;

  variant: ElementaryType | IdentifierPath;

  constructor(ast: ast.MappingKeyType) {
    super(ast);

    this.variant = createNonterminalVariant(ast.variant);

    this.updateMetadata(this.variant);
  }

  print(path: AstPath<MappingKeyType>, print: PrintFunction): Doc {
    return path.call(print, 'variant');
  }
}
