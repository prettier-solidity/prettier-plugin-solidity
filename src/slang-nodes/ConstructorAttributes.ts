import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { sortFunctionAttributes } from '../slang-utils/sort-function-attributes.js';
import { VariantCollection } from './VariantCollection.js';
import { ConstructorAttribute } from './ConstructorAttribute.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

const { line } = doc.builders;

export class ConstructorAttributes extends VariantCollection<
  ast.ConstructorAttributes,
  ConstructorAttribute
> {
  readonly kind = NonterminalKind.ConstructorAttributes;

  constructor(ast: ast.ConstructorAttributes, collected: CollectedMetadata) {
    super(ast, collected, ConstructorAttribute);

    this.items.sort(sortFunctionAttributes);
  }

  print(print: PrintFunction, path: AstPath<ConstructorAttributes>): Doc {
    return path.map(() => [line, print()], 'items');
  }
}
