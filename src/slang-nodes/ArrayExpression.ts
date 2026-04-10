import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { ArrayValues } from './ArrayValues.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { PrintableNode } from './types.d.ts';

export class ArrayExpression extends SlangNode {
  readonly kind = NonterminalKind.ArrayExpression;

  items: ArrayValues;

  constructor(
    ast: ast.ArrayExpression,
    collected: CollectedMetadata,
    options: ParserOptions<PrintableNode>
  ) {
    super(ast, collected);

    this.items = new ArrayValues(ast.items, collected, options);

    this.updateMetadata(this.items);
  }

  print(path: AstPath<ArrayExpression>, print: PrintFunction): Doc {
    return ['[', path.call(print, 'items'), ']'];
  }
}
