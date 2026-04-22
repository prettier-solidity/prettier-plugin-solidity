import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { sortFunctionAttributes } from '../slang-utils/sort-function-attributes.js';
import { VariantCollection } from './VariantCollection.js';
import { FunctionTypeAttribute } from './FunctionTypeAttribute.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

const { line } = doc.builders;

export class FunctionTypeAttributes extends VariantCollection<
  ast.FunctionTypeAttributes,
  FunctionTypeAttribute
> {
  readonly kind = NonterminalKind.FunctionTypeAttributes;

  constructor(ast: ast.FunctionTypeAttributes, collected: CollectedMetadata) {
    super(ast, collected, FunctionTypeAttribute);

    this.items.sort(sortFunctionAttributes);
  }

  print(print: PrintFunction, path: AstPath<FunctionTypeAttributes>): Doc {
    return path.map(() => [line, print()], 'items');
  }
}
