import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { sortFunctionAttributes } from '../slang-utils/sort-function-attributes.js';
import { SlangNode } from './SlangNode.js';
import { UnnamedFunctionAttribute } from './UnnamedFunctionAttribute.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

const { line } = doc.builders;

export class UnnamedFunctionAttributes extends SlangNode {
  readonly kind = NonterminalKind.UnnamedFunctionAttributes;

  items: UnnamedFunctionAttribute[];

  constructor(
    ast: ast.UnnamedFunctionAttributes,
    options: ParserOptions<AstNode>
  ) {
    super(ast);

    this.items = ast.items.map(
      (item) => new UnnamedFunctionAttribute(item, options)
    );

    this.updateMetadata(this.items);

    this.items = this.items.sort(sortFunctionAttributes);
  }

  print(path: AstPath<UnnamedFunctionAttributes>, print: PrintFunction): Doc {
    return path.map(print, 'items').map((item) => [line, item]);
  }
}
