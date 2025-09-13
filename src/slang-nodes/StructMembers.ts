import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { SlangNode } from './SlangNode.js';
import { StructMember } from './StructMember.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

const { hardline } = doc.builders;

export class StructMembers extends SlangNode {
  readonly kind = NonterminalKind.StructMembers;

  items: StructMember[];

  constructor(ast: ast.StructMembers, options: ParserOptions<AstNode>) {
    super(ast, true);

    this.items = ast.items.map((item) => new StructMember(item, options));
  }

  print(path: AstPath<StructMembers>, print: PrintFunction): Doc {
    return this.items.length > 0
      ? printSeparatedList(path.map(print, 'items'), {
          firstSeparator: hardline,
          separator: hardline
        })
      : '';
  }
}
