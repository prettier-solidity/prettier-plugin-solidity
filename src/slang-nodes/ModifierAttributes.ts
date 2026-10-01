import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { line } from '../slang-printers/prettier-builders.ts';
import { sortFunctionAttributes } from '../slang-utils/sort-function-attributes.ts';
import { extractVariant } from '../slang-utils/extract-variant.ts';
import { SlangNode } from './SlangNode.ts';
import { ModifierAttribute } from './ModifierAttribute.ts';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class ModifierAttributes extends SlangNode {
  readonly kind = NonterminalKind.ModifierAttributes;

  items: ModifierAttribute['variant'][];

  constructor(ast: ast.ModifierAttributes, collected: CollectedMetadata) {
    super(ast, collected, true);

    this.items = ast.items.map((item) =>
      extractVariant(new ModifierAttribute(item, collected))
    );

    this.items.sort(sortFunctionAttributes);
  }

  print(print: PrintFunction, path: AstPath<ModifierAttributes>): Doc {
    return path.map(() => [line, print()], 'items');
  }
}
