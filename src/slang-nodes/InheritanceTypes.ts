import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { line } from '../slang-printers/prettier-builders.ts';
import { printSeparatedList } from '../slang-printers/print-separated-list.ts';
import { SlangNode } from './SlangNode.ts';
import { InheritanceType } from './InheritanceType.ts';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class InheritanceTypes extends SlangNode {
  readonly kind = NonterminalKind.InheritanceTypes;

  items: InheritanceType[];

  constructor(ast: ast.InheritanceTypes, collected: CollectedMetadata) {
    super(ast, collected, true);

    this.items = ast.items.map((item) => new InheritanceType(item, collected));
  }

  print(print: PrintFunction, path: AstPath<InheritanceTypes>): Doc {
    return printSeparatedList(path.map(print, 'items'), {
      firstSeparator: line
    });
  }
}
