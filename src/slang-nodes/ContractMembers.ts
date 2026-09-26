import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printIndentedPreservingEmptyLines } from '../slang-printers/print-preserving-empty-lines.ts';
import { extractVariant } from '../slang-utils/extract-variant.ts';
import { SlangNode } from './SlangNode.ts';
import { ContractMember } from './ContractMember.ts';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { PrintableNode } from './types.d.ts';

export class ContractMembers extends SlangNode {
  readonly kind = NonterminalKind.ContractMembers;

  items: ContractMember['variant'][];

  constructor(ast: ast.ContractMembers, collected: CollectedMetadata) {
    super(ast, collected, true);

    this.items = ast.items.map((item) =>
      extractVariant(new ContractMember(item, collected))
    );
  }

  print(
    print: PrintFunction,
    path: AstPath<ContractMembers>,
    options: ParserOptions<PrintableNode>
  ): Doc {
    return printIndentedPreservingEmptyLines(this, path, print, options);
  }
}
