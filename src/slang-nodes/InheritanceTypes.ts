import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { NodeCollection } from './NodeCollection.js';
import { InheritanceType } from './InheritanceType.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

const { line } = doc.builders;

export class InheritanceTypes extends NodeCollection<
  ast.InheritanceTypes,
  InheritanceType
> {
  readonly kind = NonterminalKind.InheritanceTypes;

  constructor(ast: ast.InheritanceTypes, collected: CollectedMetadata) {
    super(ast, collected, InheritanceType);
  }

  print(print: PrintFunction, path: AstPath<InheritanceTypes>): Doc {
    return printSeparatedList(path.map(print, 'items'), {
      firstSeparator: line
    });
  }
}
