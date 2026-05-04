import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { sortFunctionAttributes } from '../slang-utils/sort-function-attributes.js';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { FunctionAttribute } from './FunctionAttribute.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

const { line } = doc.builders;

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
