import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { sortFunctionAttributes } from '../slang-utils/sort-function-attributes.js';
import { VariantCollection } from './VariantCollection.js';
import { UnnamedFunctionAttribute } from './UnnamedFunctionAttribute.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

const { line } = doc.builders;

export class UnnamedFunctionAttributes extends VariantCollection<
  ast.UnnamedFunctionAttributes,
  UnnamedFunctionAttribute
> {
  readonly kind = NonterminalKind.UnnamedFunctionAttributes;

  constructor(
    ast: ast.UnnamedFunctionAttributes,
    collected: CollectedMetadata
  ) {
    super(ast, collected, UnnamedFunctionAttribute);

    this.items.sort(sortFunctionAttributes);
  }

  print(print: PrintFunction, path: AstPath<UnnamedFunctionAttributes>): Doc {
    return path.map(() => [line, print()], 'items');
  }
}
