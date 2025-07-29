import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { sortFunctionAttributes } from '../slang-utils/sort-function-attributes.js';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { UnnamedFunctionAttribute } from './UnnamedFunctionAttribute.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

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
      extractVariant<typeof UnnamedFunctionAttribute>(
        UnnamedFunctionAttribute,
        item,
        options
      )
    );

    this.updateMetadata(this.items);

    this.items = this.items.sort(sortFunctionAttributes);
  }

  print(path: AstPath<UnnamedFunctionAttributes>, print: PrintFunction): Doc {
    return path.map(print, 'items').map((item) => [line, item]);
  }
}
