import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printSeparatedItem } from '../slang-printers/print-separated-item.js';
import { printPreservingEmptyLines } from '../slang-printers/print-preserving-empty-lines.js';
import { SlangNode } from './SlangNode.js';
import { ContractMember } from './ContractMember.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

const { hardline } = doc.builders;

export class ContractMembers extends SlangNode {
  readonly kind = NonterminalKind.ContractMembers;

  items: ContractMember[];

  constructor(ast: ast.ContractMembers, options: ParserOptions<AstNode>) {
    super(ast);

    this.items = ast.items.map((item) => new ContractMember(item, options));

    this.updateMetadata(this.items);
  }

  print(
    path: AstPath<ContractMembers>,
    print: PrintFunction,
    options: ParserOptions<AstNode>
  ): Doc {
    return this.items.length > 0 || this.comments.length > 0
      ? printSeparatedItem(printPreservingEmptyLines(path, print, options), {
          firstSeparator: hardline
        })
      : '';
  }
}
