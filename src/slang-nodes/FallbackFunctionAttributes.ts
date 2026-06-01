import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { sortFunctionAttributes } from '../slang-utils/sort-function-attributes.js';
import { VariantCollection } from './VariantCollection.js';
import { FallbackFunctionAttribute } from './FallbackFunctionAttribute.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

const { line } = doc.builders;

export class FallbackFunctionAttributes extends VariantCollection<
  ast.FallbackFunctionAttributes,
  FallbackFunctionAttribute
> {
  readonly kind = NonterminalKind.FallbackFunctionAttributes;

  constructor(
    ast: ast.FallbackFunctionAttributes,
    collected: CollectedMetadata
  ) {
    super(ast, collected, FallbackFunctionAttribute);

    this.items.sort(sortFunctionAttributes);
  }

  print(print: PrintFunction, path: AstPath<FallbackFunctionAttributes>): Doc {
    return path.map(() => [line, print()], 'items');
  }
}
