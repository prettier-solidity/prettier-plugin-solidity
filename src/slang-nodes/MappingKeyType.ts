import * as ast from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { ElementaryType } from './ElementaryType.js';
import { IdentifierPath } from './IdentifierPath.js';

function createNonterminalVariant(
  variant: ast.MappingKeyType['variant']
): MappingKeyType['variant'] {
  if (variant instanceof ast.ElementaryType) {
    return new ElementaryType(variant);
  }
  if (variant instanceof ast.IdentifierPath) {
    return new IdentifierPath(variant);
  }
  const exhaustiveCheck: never = variant;
  return exhaustiveCheck;
}

export class MappingKeyType extends SlangNode {
  readonly kind = NonterminalKind.MappingKeyType;

  variant: ElementaryType | IdentifierPath;

  constructor(ast: ast.MappingKeyType) {
    super(ast);

    this.variant = createNonterminalVariant(ast.variant);

    this.updateMetadata(this.variant);
  }
}
