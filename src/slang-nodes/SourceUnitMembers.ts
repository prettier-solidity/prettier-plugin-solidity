import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { printPreservingEmptyLines } from '../slang-printers/print-preserving-empty-lines.js';
import { SlangNode } from './SlangNode.js';
import { SourceUnitMember } from './SourceUnitMember.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

export class SourceUnitMembers extends SlangNode {
  readonly kind = NonterminalKind.SourceUnitMembers;

  items: SourceUnitMember['variant'][];

  constructor(ast: ast.SourceUnitMembers, options: ParserOptions<AstNode>) {
    super(ast, true);

    this.items = ast.items.map((item) =>
      extractVariant(new SourceUnitMember(item, options))
    );

    this.updateMetadata(this.items);
  }

  print(
    path: AstPath<SourceUnitMembers>,
    print: PrintFunction,
    options: ParserOptions<AstNode>
  ): Doc {
    return printPreservingEmptyLines(path, print, options);
  }
}
