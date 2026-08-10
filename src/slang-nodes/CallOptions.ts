import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { line, softline } from '../slang-printers/prettier-builders.js';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { SlangNode } from './SlangNode.js';
import { NamedArgument } from './NamedArgument.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { PrintableNode } from './types.d.ts';

export class CallOptions extends SlangNode {
  readonly kind = NonterminalKind.CallOptions;

  items: NamedArgument[];

  constructor(ast: ast.CallOptions, collected: CollectedMetadata) {
    super(ast, collected, true);

    this.items = ast.items.map((item) => new NamedArgument(item, collected));
  }

  print(
    print: PrintFunction,
    path: AstPath<CallOptions>,
    options: ParserOptions<PrintableNode>
  ): Doc {
    return printSeparatedList(path.map(print, 'items'), {
      firstSeparator: options.bracketSpacing ? line : softline
    });
  }
}
