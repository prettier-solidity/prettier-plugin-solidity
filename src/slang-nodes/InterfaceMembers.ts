import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printIndentedPreservingEmptyLines } from '../slang-printers/print-preserving-empty-lines.js';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { ContractMember } from './ContractMember.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { PrintableNode } from './types.d.ts';

export class InterfaceMembers extends SlangNode {
  readonly kind = NonterminalKind.InterfaceMembers;

  items: ContractMember['variant'][];

  constructor(ast: ast.InterfaceMembers, collected: CollectedMetadata) {
    super(ast, collected, true);

    this.items = ast.items.map((item) =>
      extractVariant(new ContractMember(item, collected))
    );
  }

  print(
    print: PrintFunction,
    path: AstPath<InterfaceMembers>,
    options: ParserOptions<PrintableNode>
  ): Doc {
    return printIndentedPreservingEmptyLines(this, path, print, options);
  }
}
