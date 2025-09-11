import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { SlangNode } from './SlangNode.js';
import { NamedArgument } from './NamedArgument.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

const { line, softline } = doc.builders;

export class CallOptions extends SlangNode {
  readonly kind = NonterminalKind.CallOptions;

  items: NamedArgument[];

  constructor(ast: ast.CallOptions, options: ParserOptions<AstNode>) {
    super(ast, true);

    this.items = ast.items.map((item) => new NamedArgument(item, options));
  }

  print(
    path: AstPath<CallOptions>,
    print: PrintFunction,
    options: ParserOptions<AstNode>
  ): Doc {
    return printSeparatedList(path.map(print, 'items'), {
      firstSeparator: options.bracketSpacing ? line : softline
    });
  }
}
