import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { SlangNode } from './SlangNode.js';
import { ErrorParameter } from './ErrorParameter.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class ErrorParameters extends SlangNode {
  readonly kind = NonterminalKind.ErrorParameters;

  items: ErrorParameter[];

  constructor(ast: ast.ErrorParameters, options: ParserOptions<AstNode>) {
    super(ast, true);

    this.items = ast.items.map((item) => new ErrorParameter(item, options));
  }

  print(path: AstPath<ErrorParameters>, print: PrintFunction): Doc {
    return this.items.length > 0
      ? printSeparatedList(path.map(print, 'items'))
      : '';
  }
}
