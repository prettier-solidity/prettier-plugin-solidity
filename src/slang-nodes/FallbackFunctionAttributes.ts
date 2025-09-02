import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { sortFunctionAttributes } from '../slang-utils/sort-function-attributes.js';
import { SlangNode } from './SlangNode.js';
import { FallbackFunctionAttribute } from './FallbackFunctionAttribute.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

const { line } = doc.builders;

export class FallbackFunctionAttributes extends SlangNode {
  readonly kind = NonterminalKind.FallbackFunctionAttributes;

  items: FallbackFunctionAttribute[];

  constructor(
    ast: ast.FallbackFunctionAttributes,
    options: ParserOptions<AstNode>
  ) {
    super(ast, true);

    this.items = ast.items.map(
      (item) => new FallbackFunctionAttribute(item, options)
    );

    this.items = this.items.sort(sortFunctionAttributes);
  }

  print(path: AstPath<FallbackFunctionAttributes>, print: PrintFunction): Doc {
    return path.map(print, 'items').map((item) => [line, item]);
  }
}
