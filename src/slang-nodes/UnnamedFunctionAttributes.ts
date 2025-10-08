import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { sortFunctionAttributes } from '../slang-utils/sort-function-attributes.js';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { UnnamedFunctionAttribute } from './UnnamedFunctionAttribute.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

const { line } = doc.builders;

export class UnnamedFunctionAttributes extends SlangNode {
  readonly kind = NonterminalKind.UnnamedFunctionAttributes;

  items: UnnamedFunctionAttribute['variant'][];

  constructor(
    ast: ast.UnnamedFunctionAttributes,
    options: ParserOptions<AstNode>
  ) {
    super(ast, true);

    this.items = ast.items.map((item) =>
      extractVariant(new UnnamedFunctionAttribute(item, options))
    );

    this.items.sort(sortFunctionAttributes);
  }

  print(path: AstPath<UnnamedFunctionAttributes>, print: PrintFunction): Doc {
    return path.map((item) => [line, print(item)], 'items');
  }
}
