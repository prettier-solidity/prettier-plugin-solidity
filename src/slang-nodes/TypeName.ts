import * as ast from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { createNonterminalVariantCreator } from '../slang-utils/create-nonterminal-variant-creator.js';
import { PolymorphicNonterminalNode } from './PolymorphicNonterminalNode.js';
import { ArrayTypeName } from './ArrayTypeName.js';
import { FunctionType } from './FunctionType.js';
import { MappingType } from './MappingType.js';
import { ElementaryType } from './ElementaryType.js';
import { IdentifierPath } from './IdentifierPath.js';

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

export class TypeName extends PolymorphicNonterminalNode<
  ast.TypeName,
  | ArrayTypeName
  | FunctionType
  | MappingType
  | ElementaryType['variant']
  | IdentifierPath
> {
  readonly kind = NonterminalKind.TypeName;

  constructor(ast: ast.TypeName, collected: CollectedMetadata) {
    super(ast, collected, createNonterminalVariant);
  }
}
