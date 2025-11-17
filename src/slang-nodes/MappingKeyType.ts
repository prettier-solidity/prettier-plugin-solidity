import * as ast from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { ElementaryType } from './ElementaryType.js';
import { IdentifierPath } from './IdentifierPath.js';

function createNonterminalVariant(
  variant: ast.MappingKeyType['variant']
): MappingKeyType['variant'] {
  if (variant instanceof ast.ElementaryType) {
    return extractVariant(new ElementaryType(variant));
  }
  if (variant instanceof ast.IdentifierPath) {
    return new IdentifierPath(variant);
  }
  const exhaustiveCheck: never = variant;
  throw new Error(`Unexpected variant: ${JSON.stringify(exhaustiveCheck)}`);
}

export class MappingKeyType extends SlangNode {
  readonly kind = NonterminalKind.MappingKeyType;

  variant: ElementaryType['variant'] | IdentifierPath;

  constructor(ast: ast.MappingKeyType) {
    super(ast);

    this.variant = createNonterminalVariant(ast.variant);

    this.updateMetadata(this.variant);
  }
}
