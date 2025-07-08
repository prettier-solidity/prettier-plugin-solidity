import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { EventParameter } from './EventParameter.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class EventParameters implements SlangNode {
  readonly kind = NonterminalKind.EventParameters;

  comments;

  loc;

  items: EventParameter[];

  constructor(ast: ast.EventParameters, options: ParserOptions<AstNode>) {
    const metadata = getNodeMetadata(ast, true);

    this.items = ast.items.map((item) => new EventParameter(item, options));

    [this.loc, this.comments] = updateMetadata(metadata, [this.items]);
  }

  print(path: AstPath<EventParameters>, print: PrintFunction): Doc {
    return this.items.length > 0
      ? printSeparatedList(path.map(print, 'items'))
      : '';
  }
}
