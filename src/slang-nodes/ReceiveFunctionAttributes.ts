import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { sortFunctionAttributes } from '../slang-utils/sort-function-attributes.js';
import { VariantCollection } from './VariantCollection.js';
import { ReceiveFunctionAttribute } from './ReceiveFunctionAttribute.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

const { line } = doc.builders;

export class ReceiveFunctionAttributes extends VariantCollection<
  ast.ReceiveFunctionAttributes,
  ReceiveFunctionAttribute
> {
  readonly kind = NonterminalKind.ReceiveFunctionAttributes;

  constructor(
    ast: ast.ReceiveFunctionAttributes,
    collected: CollectedMetadata
  ) {
    super(ast, collected, ReceiveFunctionAttribute);

    this.items.sort(sortFunctionAttributes);
  }

  print(print: PrintFunction, path: AstPath<ReceiveFunctionAttributes>): Doc {
    return path.map(() => [line, print()], 'items');
  }
}
