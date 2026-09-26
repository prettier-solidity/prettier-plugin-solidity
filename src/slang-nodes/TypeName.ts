import * as ast from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { createNonterminalVariantCreator } from '../slang-utils/create-nonterminal-variant-creator.ts';
import { SlangNode } from './SlangNode.ts';
import { ArrayTypeName } from './ArrayTypeName.ts';
import { FunctionType } from './FunctionType.ts';
import { MappingType } from './MappingType.ts';
import { ElementaryType } from './ElementaryType.ts';
import { IdentifierPath } from './IdentifierPath.ts';

import type { CollectedMetadata } from '../types.d.ts';

const createNonterminalVariant = createNonterminalVariantCreator<
  ast.TypeName,
  TypeName
>(
  [
    [ast.ArrayTypeName, ArrayTypeName],
    [ast.FunctionType, FunctionType],
    [ast.MappingType, MappingType],
    [ast.IdentifierPath, IdentifierPath]
  ],
  [[ast.ElementaryType, ElementaryType]]
);

export class TypeName extends SlangNode {
  readonly kind = NonterminalKind.TypeName;

  variant:
    | ArrayTypeName
    | FunctionType
    | MappingType
    | ElementaryType['variant']
    | IdentifierPath;

  constructor(ast: ast.TypeName, collected: CollectedMetadata) {
    super(ast, collected);

    this.variant = createNonterminalVariant(ast.variant, collected);

    this.updateMetadata(this.variant);
  }
}
