import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { NodeCollection } from './NodeCollection.js';
import { TerminalNode } from './TerminalNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

const { hardline } = doc.builders;

export class EnumMembers extends NodeCollection<ast.EnumMembers, TerminalNode> {
  readonly kind = NonterminalKind.EnumMembers;

  constructor(ast: ast.EnumMembers, collected: CollectedMetadata) {
    super(ast, collected, TerminalNode);
  }

  print(print: PrintFunction, path: AstPath<EnumMembers>): Doc {
    return printSeparatedList(path.map(print, 'items'), {
      firstSeparator: hardline
    });
  }
}
