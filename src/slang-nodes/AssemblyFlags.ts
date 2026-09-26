import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printSeparatedList } from '../slang-printers/print-separated-list.ts';
import { SlangNode } from './SlangNode.ts';
import { StringLiteral } from './StringLiteral.ts';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class AssemblyFlags extends SlangNode {
  readonly kind = NonterminalKind.AssemblyFlags;

  items: StringLiteral[];

  constructor(ast: ast.AssemblyFlags, collected: CollectedMetadata) {
    super(ast, collected, true);

    this.items = ast.items.map((item) => new StringLiteral(item, collected));
  }

  print(print: PrintFunction, path: AstPath<AssemblyFlags>): Doc {
    return printSeparatedList(path.map(print, 'items'));
  }
}
