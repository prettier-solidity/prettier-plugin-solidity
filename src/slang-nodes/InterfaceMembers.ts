import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { printSeparatedItem } from '../slang-printers/print-separated-item.js';
import { printPreservingEmptyLines } from '../slang-printers/print-preserving-empty-lines.js';
import { SlangNode } from './SlangNode.js';
import { ContractMember } from './ContractMember.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

const { hardline } = doc.builders;

export class InterfaceMembers extends SlangNode {
  readonly kind = NonterminalKind.InterfaceMembers;

  items: ContractMember['variant'][];

  constructor(ast: ast.InterfaceMembers, options: ParserOptions<AstNode>) {
    super(ast, true);

    this.items = ast.items.map((item) =>
      extractVariant(new ContractMember(item, options))
    );

    this.updateMetadata(this.items);
  }

  print(
    path: AstPath<InterfaceMembers>,
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
