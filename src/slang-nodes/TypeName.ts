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

const variantConstructors = {
  [ast.ArrayTypeName.name]: ArrayTypeName,
  [ast.FunctionType.name]: FunctionType,
  [ast.MappingType.name]: MappingType,
  [ast.IdentifierPath.name]: IdentifierPath
};

const variantWithVariantsConstructors = {
  [ast.ElementaryType.name]: ElementaryType
};

function createNonterminalVariant(
  variant: ast.TypeName['variant'],
  collected: CollectedMetadata,
  options: ParserOptions<AstNode>
): TypeName['variant'] {
  const variantConstructor = variantConstructors[variant.constructor.name];
  if (variantConstructor !== undefined)
    return new variantConstructor(variant as never, collected, options);

  const variantWithVariantsConstructor =
    variantWithVariantsConstructors[variant.constructor.name];
  if (variantWithVariantsConstructor !== undefined)
    return extractVariant(
      new variantWithVariantsConstructor(variant as never, collected)
    );

  throw new Error(`Unexpected variant: ${JSON.stringify(variant)}`);
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
