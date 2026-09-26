import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { line } from '../slang-printers/prettier-builders.ts';
import { sortFunctionAttributes } from '../slang-utils/sort-function-attributes.ts';
import { extractVariant } from '../slang-utils/extract-variant.ts';
import { SlangNode } from './SlangNode.ts';
import { FallbackFunctionAttribute } from './FallbackFunctionAttribute.ts';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class FallbackFunctionAttributes extends SlangNode {
  readonly kind = NonterminalKind.FallbackFunctionAttributes;

  items: FallbackFunctionAttribute['variant'][];

  constructor(
    ast: ast.FallbackFunctionAttributes,
    collected: CollectedMetadata
  ) {
    super(ast, collected, true);

    this.items = ast.items.map((item) =>
      extractVariant(new FallbackFunctionAttribute(item, collected))
    );

    this.items.sort(sortFunctionAttributes);
  }

  print(print: PrintFunction, path: AstPath<FallbackFunctionAttributes>): Doc {
    return path.map(() => [line, print()], 'items');
  }
}
