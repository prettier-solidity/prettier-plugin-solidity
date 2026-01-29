import * as ast from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { ElementaryType } from './ElementaryType.js';
import { IdentifierPath } from './IdentifierPath.js';

import type { ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';

function createNonterminalVariant(
  variant: ast.MappingKeyType['variant'],
  options: ParserOptions<AstNode>
): MappingKeyType['variant'] {
  if (variant instanceof ast.ElementaryType) {
    return extractVariant(new ElementaryType(variant, options));
  }
  if (variant instanceof ast.IdentifierPath) {
    return new IdentifierPath(variant, options);
  }
  const exhaustiveCheck: never = variant;
  throw new Error(`Unexpected variant: ${JSON.stringify(exhaustiveCheck)}`);
}

export class MappingKeyType extends SlangNode {
  readonly kind = NonterminalKind.MappingKeyType;

  variant: ElementaryType['variant'] | IdentifierPath;

  constructor(ast: ast.MappingKeyType, options: ParserOptions<AstNode>) {
    super(ast, options);

    this.variant = createNonterminalVariant(ast.variant, options);

    this.updateMetadata(this.variant);
  }
}
