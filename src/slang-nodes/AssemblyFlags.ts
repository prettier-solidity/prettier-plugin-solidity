import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { NodeCollection } from './NodeCollection.js';
import { StringLiteral } from './StringLiteral.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class AssemblyFlags extends NodeCollection<
  ast.AssemblyFlags,
  StringLiteral
> {
  readonly kind = NonterminalKind.AssemblyFlags;

  constructor(ast: ast.AssemblyFlags, collected: CollectedMetadata) {
    super(ast, collected, StringLiteral);
  }

  print(print: PrintFunction, path: AstPath<AssemblyFlags>): Doc {
    return printSeparatedList(path.map(print, 'items'));
  }
}
