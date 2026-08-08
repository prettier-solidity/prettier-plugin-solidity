import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { NodeCollection } from './NodeCollection.js';
import { EventParameter } from './EventParameter.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class EventParameters extends NodeCollection<
  ast.EventParameters,
  EventParameter
> {
  readonly kind = NonterminalKind.EventParameters;

  constructor(ast: ast.EventParameters, collected: CollectedMetadata) {
    super(ast, collected, EventParameter);
  }

  print(print: PrintFunction, path: AstPath<EventParameters>): Doc {
    return this.items.length > 0
      ? printSeparatedList(path.map(print, 'items'))
      : '';
  }
}
