import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printSeparatedItem } from '../slang-printers/print-separated-item.js';
import { printComments } from '../slang-printers/print-comments.js';
import { printPreservingEmptyLines } from '../slang-printers/print-preserving-empty-lines.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { ContractMember } from './ContractMember.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

const { hardline } = doc.builders;

export class ContractMembers implements SlangNode {
  readonly kind = NonterminalKind.ContractMembers;

  comments;

  loc;

  items: ContractMember[];

  constructor(ast: ast.ContractMembers, options: ParserOptions<AstNode>) {
    let metadata = getNodeMetadata(ast, true);

    this.items = ast.items.map((item) => new ContractMember(item, options));

    metadata = updateMetadata(metadata, [this.items]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(
    path: AstPath<ContractMembers>,
    print: PrintFunction,
    options: ParserOptions<AstNode>
  ): Doc {
    return this.items.length === 0 && this.comments.length === 0
      ? ''
      : printSeparatedItem(
          [
            printPreservingEmptyLines(path, print, options),
            printComments(path)
          ],
          { firstSeparator: hardline, grouped: false }
        );
  }
}
