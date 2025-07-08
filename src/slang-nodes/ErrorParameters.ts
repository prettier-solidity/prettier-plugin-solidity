import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { ErrorParameter } from './ErrorParameter.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class ErrorParameters implements SlangNode {
  readonly kind = NonterminalKind.ErrorParameters;

  comments;

  loc;

  items: ErrorParameter[];

  constructor(ast: ast.ErrorParameters, options: ParserOptions<AstNode>) {
    [this.loc, this.comments] = getNodeMetadata(ast, true);

    this.items = ast.items.map((item) => new ErrorParameter(item, options));

    updateMetadata(this.loc, this.comments, [this.items]);
  }

  print(path: AstPath<ErrorParameters>, print: PrintFunction): Doc {
    return this.items.length > 0
      ? printSeparatedList(path.map(print, 'items'))
      : '';
  }
}
