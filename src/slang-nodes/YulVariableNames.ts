import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { NodeCollection } from './NodeCollection.js';
import { TerminalNode } from './TerminalNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

const { line } = doc.builders;

export class YulVariableNames extends NodeCollection<
  ast.YulVariableNames,
  TerminalNode
> {
  readonly kind = NonterminalKind.YulVariableNames;

  constructor(ast: ast.YulVariableNames, collected: CollectedMetadata) {
    super(ast, collected, TerminalNode);
  }

  print(print: PrintFunction, path: AstPath<YulVariableNames>): Doc {
    return printSeparatedList(path.map(print, 'items'), {
      firstSeparator: line,
      lastSeparator: ''
    });
  }
}
