import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { line } from '../slang-printers/prettier-builders.js';
import { sortFunctionAttributes } from '../slang-utils/sort-function-attributes.js';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { ReceiveFunctionAttribute } from './ReceiveFunctionAttribute.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class ReceiveFunctionAttributes extends SlangNode {
  readonly kind = NonterminalKind.ReceiveFunctionAttributes;

  items: ReceiveFunctionAttribute['variant'][];

  constructor(
    ast: ast.ReceiveFunctionAttributes,
    collected: CollectedMetadata
  ) {
    super(ast, collected, true);

    this.items = ast.items.map((item) =>
      extractVariant(new ReceiveFunctionAttribute(item, collected))
    );

    this.items.sort(sortFunctionAttributes);
  }

  print(print: PrintFunction, path: AstPath<ReceiveFunctionAttributes>): Doc {
    return path.map(() => [line, print()], 'items');
  }
}
