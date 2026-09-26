import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { line } from '../slang-printers/prettier-builders.ts';
import { sortFunctionAttributes } from '../slang-utils/sort-function-attributes.ts';
import { extractVariant } from '../slang-utils/extract-variant.ts';
import { SlangNode } from './SlangNode.ts';
import { FunctionTypeAttribute } from './FunctionTypeAttribute.ts';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class FunctionTypeAttributes extends SlangNode {
  readonly kind = NonterminalKind.FunctionTypeAttributes;

  items: FunctionTypeAttribute['variant'][];

  constructor(ast: ast.FunctionTypeAttributes, collected: CollectedMetadata) {
    super(ast, collected, true);

    this.items = ast.items.map((item) =>
      extractVariant(new FunctionTypeAttribute(item, collected))
    );

    this.items.sort(sortFunctionAttributes);
  }

  print(print: PrintFunction, path: AstPath<FunctionTypeAttributes>): Doc {
    return path.map(() => [line, print()], 'items');
  }
}
