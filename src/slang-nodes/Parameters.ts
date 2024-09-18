import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { printSeparatedItem } from '../slang-printers/print-separated-item.js';
import { printComments } from '../slang-printers/print-comments.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { Parameter } from './Parameter.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from '../slang-nodes';
import type { PrintFunction, SlangNode } from '../types';

export class Parameters implements SlangNode {
  readonly kind = NonterminalKind.Parameters;

  comments;

  loc;

  items: Parameter[];

  separators: string[];

  constructor(
    ast: ast.Parameters,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset, true);
    const { offsets } = metadata;

    this.items = ast.items.map(
      (item, index) => new Parameter(item, offsets[index], options)
    );
    this.separators = ast.separators.map((separator) => separator.text);

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
