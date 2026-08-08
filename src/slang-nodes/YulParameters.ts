import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { NodeCollection } from './NodeCollection.js';
import { TerminalNode } from './TerminalNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class YulParameters extends NodeCollection<
  ast.YulParameters,
  TerminalNode
> {
  readonly kind = NonterminalKind.YulParameters;

  constructor(ast: ast.YulParameters, collected: CollectedMetadata) {
    super(ast, collected, TerminalNode);
  }

  print(print: PrintFunction, path: AstPath<YulParameters>): Doc {
    return printSeparatedList(path.map(print, 'items'));
  }
}
