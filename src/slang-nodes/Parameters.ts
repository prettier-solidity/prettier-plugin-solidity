import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { printSeparatedItem } from '../slang-printers/print-separated-item.js';
import { printComments } from '../slang-printers/print-comments.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { Parameter } from './Parameter.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class Parameters implements SlangNode {
  readonly kind = NonterminalKind.Parameters;

  comments;

  loc;

  items: Parameter[];

  separators: string[];

  constructor(ast: ast.Parameters, options: ParserOptions<AstNode>) {
    let metadata = getNodeMetadata(ast, true);

    this.items = ast.items.map((item) => new Parameter(item, options));
    this.separators = ast.separators.map((separator) => separator.unparse());

    metadata = updateMetadata(metadata, [this.items]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<Parameters>, print: PrintFunction): Doc {
    if (this.items.length > 0) {
      return printSeparatedList(path.map(print, 'items'), { grouped: false });
    }

    const parameterComments = printComments(path);

    return parameterComments.length > 0
      ? printSeparatedItem(parameterComments)
      : '';
  }
}
