import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { NodeCollection } from './NodeCollection.js';
import { NamedArgument } from './NamedArgument.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { PrintableNode } from './types.d.ts';

const { line, softline } = doc.builders;

export class CallOptions extends NodeCollection<
  ast.CallOptions,
  NamedArgument
> {
  readonly kind = NonterminalKind.CallOptions;

  constructor(ast: ast.CallOptions, collected: CollectedMetadata) {
    super(ast, collected, NamedArgument);
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
