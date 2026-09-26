import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { line } from '../slang-printers/prettier-builders.ts';
import { sortFunctionAttributes } from '../slang-utils/sort-function-attributes.ts';
import { extractVariant } from '../slang-utils/extract-variant.ts';
import { SlangNode } from './SlangNode.ts';
import { FunctionAttribute } from './FunctionAttribute.ts';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class FunctionAttributes extends SlangNode {
  readonly kind = NonterminalKind.FunctionAttributes;

  items: FunctionAttribute['variant'][];

  constructor(ast: ast.FunctionAttributes, collected: CollectedMetadata) {
    super(ast, collected, true);

    this.items = ast.items.map((item) =>
      extractVariant(new FunctionAttribute(item, collected))
    );

    this.items.sort(sortFunctionAttributes);
  }

  print(print: PrintFunction, path: AstPath<FunctionAttributes>): Doc {
    return path.map(() => [line, print()], 'items');
  }
}
