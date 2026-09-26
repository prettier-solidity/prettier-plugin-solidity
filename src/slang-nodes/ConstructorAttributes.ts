import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { sortFunctionAttributes } from '../slang-utils/sort-function-attributes.ts';
import { line } from '../slang-printers/prettier-builders.ts';
import { extractVariant } from '../slang-utils/extract-variant.ts';
import { SlangNode } from './SlangNode.ts';
import { ConstructorAttribute } from './ConstructorAttribute.ts';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class ConstructorAttributes extends SlangNode {
  readonly kind = NonterminalKind.ConstructorAttributes;

  items: ConstructorAttribute['variant'][];

  constructor(ast: ast.ConstructorAttributes, collected: CollectedMetadata) {
    super(ast, collected, true);

    this.items = ast.items.map((item) =>
      extractVariant(new ConstructorAttribute(item, collected))
    );

    this.items.sort(sortFunctionAttributes);
  }

  print(print: PrintFunction, path: AstPath<ConstructorAttributes>): Doc {
    return path.map(() => [line, print()], 'items');
  }
}
