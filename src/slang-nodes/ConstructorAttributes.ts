import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { sortFunctionAttributes } from '../slang-utils/sort-function-attributes.js';
import { SlangNode } from './SlangNode.js';
import { ConstructorAttribute } from './ConstructorAttribute.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

const { line } = doc.builders;

export class ConstructorAttributes extends SlangNode {
  readonly kind = NonterminalKind.ConstructorAttributes;

  items: ConstructorAttribute[];

  constructor(ast: ast.ConstructorAttributes, options: ParserOptions<AstNode>) {
    super(ast, true);

    this.items = ast.items.map(
      (item) => new ConstructorAttribute(item, options)
    );

    this.items.sort(sortFunctionAttributes);
  }

  print(path: AstPath<ConstructorAttributes>, print: PrintFunction): Doc {
    return path.map(print, 'items').map((item) => [line, item]);
  }
}
