import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { sortFunctionAttributes } from '../slang-utils/sort-function-attributes.js';
import { VariantCollection } from './VariantCollection.js';
import { ModifierAttribute } from './ModifierAttribute.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

const { line } = doc.builders;

export class ModifierAttributes extends VariantCollection<
  ast.ModifierAttributes,
  ModifierAttribute
> {
  readonly kind = NonterminalKind.ModifierAttributes;

  constructor(ast: ast.ModifierAttributes, collected: CollectedMetadata) {
    super(ast, collected, ModifierAttribute);

    this.items.sort(sortFunctionAttributes);
  }

  print(print: PrintFunction, path: AstPath<ModifierAttributes>): Doc {
    return path.map(() => [line, print()], 'items');
  }
}
