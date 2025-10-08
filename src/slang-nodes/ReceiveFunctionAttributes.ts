import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { sortFunctionAttributes } from '../slang-utils/sort-function-attributes.js';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { ReceiveFunctionAttribute } from './ReceiveFunctionAttribute.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

const { line } = doc.builders;

export class ReceiveFunctionAttributes extends SlangNode {
  readonly kind = NonterminalKind.ReceiveFunctionAttributes;

  items: ReceiveFunctionAttribute['variant'][];

  constructor(
    ast: ast.ReceiveFunctionAttributes,
    options: ParserOptions<AstNode>
  ) {
    super(ast, true);

    this.items = ast.items.map((item) =>
      extractVariant(new ReceiveFunctionAttribute(item, options))
    );

    this.items.sort(sortFunctionAttributes);
  }

  print(path: AstPath<ReceiveFunctionAttributes>, print: PrintFunction): Doc {
    return path.map((item) => [line, print(item)], 'items');
  }
}
