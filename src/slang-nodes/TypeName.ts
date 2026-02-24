import * as slangAst from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { createNonterminalVariantCreator } from '../slang-utils/create-nonterminal-variant-creator.js';
import { SlangNode } from './SlangNode.js';
import { ArrayTypeName } from './ArrayTypeName.js';
import { FunctionType } from './FunctionType.js';
import { MappingType } from './MappingType.js';
import { ElementaryType } from './ElementaryType.js';
import { IdentifierPath } from './IdentifierPath.js';

import type { ParserOptions } from 'prettier';
import type { CollectedMetadata } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

const createNonterminalVariant = createNonterminalVariantCreator<
  slangAst.TypeName,
  TypeName
>(
  [
    [slangAst.ArrayTypeName, ArrayTypeName],
    [slangAst.FunctionType, FunctionType],
    [slangAst.MappingType, MappingType],
    [slangAst.IdentifierPath, IdentifierPath]
  ],
  [[slangAst.ElementaryType, ElementaryType]]
);

export class TypeName extends SlangNode {
  readonly kind = NonterminalKind.TypeName;

  variant:
    | ArrayTypeName
    | FunctionType
    | MappingType
    | ElementaryType['variant']
    | IdentifierPath;

  constructor(
    ast: slangAst.TypeName,
    collected: CollectedMetadata,
    options: ParserOptions<AstNode>
  ) {
    super(ast, collected);

    if (process.env.NODE_ENV === 'test') {
      // This is to ensure that we have handled all variants of `TypeName` in
      // the `createNonterminalVariant` function above.
      ((variant: slangAst.TypeName['variant']): void => {
        if (variant instanceof slangAst.ArrayTypeName) return;
        if (variant instanceof slangAst.FunctionType) return;
        if (variant instanceof slangAst.MappingType) return;
        if (variant instanceof slangAst.IdentifierPath) return;
        if (variant instanceof slangAst.ElementaryType) return;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _exhaustiveCheck: never = variant;
      })(ast.variant);
    }
    this.variant = createNonterminalVariant(ast.variant, collected, options);

    this.updateMetadata(this.variant);
  }
}
