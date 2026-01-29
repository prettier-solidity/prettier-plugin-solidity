import * as ast from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { ArrayTypeName } from './ArrayTypeName.js';
import { FunctionType } from './FunctionType.js';
import { MappingType } from './MappingType.js';
import { ElementaryType } from './ElementaryType.js';
import { IdentifierPath } from './IdentifierPath.js';

import type { ParserOptions } from 'prettier';
import type { CollectedMetadata } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

function createNonterminalVariant(
  variant: ast.TypeName['variant'],
  collected: CollectedMetadata,
  options: ParserOptions<AstNode>
): TypeName['variant'] {
  if (variant instanceof ast.ArrayTypeName) {
    return new ArrayTypeName(variant, collected, options);
  }
  if (variant instanceof ast.FunctionType) {
    return new FunctionType(variant, collected, options);
  }
  if (variant instanceof ast.MappingType) {
    return new MappingType(variant, collected, options);
  }
  if (variant instanceof ast.ElementaryType) {
    return extractVariant(new ElementaryType(variant, collected));
  }
  if (variant instanceof ast.IdentifierPath) {
    return new IdentifierPath(variant, collected);
  }
  const exhaustiveCheck: never = variant;
  throw new Error(`Unexpected variant: ${JSON.stringify(exhaustiveCheck)}`);
}

export class TypeName extends SlangNode {
  readonly kind = NonterminalKind.TypeName;

  variant:
    | ArrayTypeName
    | FunctionType
    | MappingType
    | ElementaryType['variant']
    | IdentifierPath;

  constructor(
    ast: ast.TypeName,
    collected: CollectedMetadata,
    options: ParserOptions<AstNode>
  ) {
    super(ast, collected);

    this.variant = createNonterminalVariant(ast.variant, collected, options);

    this.updateMetadata(this.variant);
  }
}
