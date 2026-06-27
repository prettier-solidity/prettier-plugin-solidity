import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { sortFunctionAttributes } from '../slang-utils/sort-function-attributes.js';
import { VariantCollection } from './VariantCollection.js';
import { FunctionAttribute } from './FunctionAttribute.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

const { line } = doc.builders;

export class FunctionAttributes extends VariantCollection<
  ast.FunctionAttributes,
  FunctionAttribute
> {
  readonly kind = NonterminalKind.FunctionAttributes;

  constructor(ast: ast.FunctionAttributes, collected: CollectedMetadata) {
    super(ast, collected, FunctionAttribute);

    this.items.sort(sortFunctionAttributes);
  }

  print(print: PrintFunction, path: AstPath<FunctionAttributes>): Doc {
    return path.map(() => [line, print()], 'items');
  }
}
