import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { SlangNode } from './SlangNode.js';
import { EventParameter } from './EventParameter.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class EventParameters extends SlangNode {
  readonly kind = NonterminalKind.EventParameters;

  items: EventParameter[];

  constructor(ast: ast.EventParameters, options: ParserOptions<AstNode>) {
    super(ast, true);

    this.items = ast.items.map((item) => new EventParameter(item, options));
  }

  print(path: AstPath<EventParameters>, print: PrintFunction): Doc {
    return this.items.length > 0
      ? printSeparatedList(path.map(print, 'items'))
      : '';
  }
}
