import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printSeparatedList } from '../slang-printers/print-separated-list.ts';
import { SlangNode } from './SlangNode.ts';
import { EventParameter } from './EventParameter.ts';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class EventParameters extends SlangNode {
  readonly kind = NonterminalKind.EventParameters;

  items: EventParameter[];

  constructor(ast: ast.EventParameters, collected: CollectedMetadata) {
    super(ast, collected, true);

    this.items = ast.items.map((item) => new EventParameter(item, collected));
  }

  print(print: PrintFunction, path: AstPath<EventParameters>): Doc {
    return this.items.length > 0
      ? printSeparatedList(path.map(print, 'items'))
      : '';
  }
}
