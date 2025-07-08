import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { ArrayValues } from './ArrayValues.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

const { group } = doc.builders;

export class ArrayExpression extends SlangNode {
  readonly kind = NonterminalKind.ArrayExpression;

  items: ArrayValues;

  constructor(ast: ast.ArrayExpression, options: ParserOptions<AstNode>) {
    super(ast);

    this.items = new ArrayValues(ast.items, options);

    this.updateMetadata([this.items]);
  }

  print(path: AstPath<ArrayExpression>, print: PrintFunction): Doc {
    return group(['[', path.call(print, 'items'), ']']);
  }
}
