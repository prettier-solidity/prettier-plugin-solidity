import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { SlangNode } from './SlangNode.js';
import { NamedArgument } from './NamedArgument.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { PrintableNode } from './types.d.ts';

const { line, softline } = doc.builders;

export class NamedArguments extends SlangNode {
  readonly kind = NonterminalKind.NamedArguments;

  items: NamedArgument[];

  constructor(ast: ast.NamedArguments, collected: CollectedMetadata) {
    super(ast, collected, true);

    this.items = ast.items.map((item) => new NamedArgument(item, collected));
  }

  print(
    print: PrintFunction,
    path: AstPath<NamedArguments>,
    options: ParserOptions<PrintableNode>
  ): Doc {
    return printSeparatedList(path.map(print, 'items'), {
      firstSeparator: options.bracketSpacing ? line : softline
    });
  }
}
