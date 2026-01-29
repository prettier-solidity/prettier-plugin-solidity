import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { SlangNode } from './SlangNode.js';
import { StringLiteral } from './StringLiteral.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class AssemblyFlags extends SlangNode {
  readonly kind = NonterminalKind.AssemblyFlags;

  items: StringLiteral[];

  constructor(
    ast: ast.AssemblyFlags,
    collected: CollectedMetadata,
    options: ParserOptions<AstNode>
  ) {
    super(ast, collected, true);

    this.items = ast.items.map(
      (item) => new StringLiteral(item, collected, options)
    );
  }

  print(path: AstPath<AssemblyFlags>, print: PrintFunction): Doc {
    return printSeparatedList(path.map(print, 'items'));
  }
}
