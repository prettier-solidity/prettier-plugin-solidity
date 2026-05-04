import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { sortFunctionAttributes } from '../slang-utils/sort-function-attributes.js';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { FallbackFunctionAttribute } from './FallbackFunctionAttribute.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

const { line } = doc.builders;

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
