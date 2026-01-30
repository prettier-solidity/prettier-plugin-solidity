import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printPreservingEmptyLines } from '../slang-printers/print-preserving-empty-lines.js';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { SourceUnitMember } from './SourceUnitMember.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class SourceUnitMembers extends SlangNode {
  readonly kind = NonterminalKind.SourceUnitMembers;

  items: SourceUnitMember['variant'][];

  constructor(
    ast: ast.SourceUnitMembers,
    collected: CollectedMetadata,
    options: ParserOptions<AstNode>
  ) {
    super(ast, collected, true);

    this.items = ast.items.map((item) =>
      extractVariant(new SourceUnitMember(item, collected, options))
    );
  }

  print(
    path: AstPath<SourceUnitMembers>,
    print: PrintFunction,
    options: ParserOptions<AstNode>
  ): Doc {
    return printPreservingEmptyLines(path, print, options);
  }
}
