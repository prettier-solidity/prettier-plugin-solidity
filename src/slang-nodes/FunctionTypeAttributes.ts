import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { sortFunctionAttributes } from '../slang-utils/sort-function-attributes.js';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { FunctionTypeAttribute } from './FunctionTypeAttribute.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction } from '../types.d.ts';

const { line } = doc.builders;

export class FunctionTypeAttributes extends SlangNode {
  readonly kind = NonterminalKind.FunctionTypeAttributes;

  items: FunctionTypeAttribute['variant'][];

  constructor(ast: ast.FunctionTypeAttributes) {
    super(ast, true);

    this.items = ast.items.map((item) =>
      extractVariant(new FunctionTypeAttribute(item))
    );

    this.items.sort(sortFunctionAttributes);
  }

  print(path: AstPath<FunctionTypeAttributes>, print: PrintFunction): Doc {
    return path.map((item) => [line, print(item)], 'items');
  }
}
