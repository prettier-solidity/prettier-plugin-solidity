import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printPreservingEmptyLines } from '../slang-printers/print-preserving-empty-lines.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { SourceUnitMember } from './SourceUnitMember.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class SourceUnitMembers implements SlangNode {
  readonly kind = NonterminalKind.SourceUnitMembers;

  comments;

  loc;

  items: SourceUnitMember[];

  constructor(ast: ast.SourceUnitMembers, options: ParserOptions<AstNode>) {
    let metadata = getNodeMetadata(ast, true);

    this.items = ast.items.map((item) => new SourceUnitMember(item, options));

    metadata = updateMetadata(metadata, [this.items]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(
    path: AstPath<SourceUnitMembers>,
    print: PrintFunction,
    options: ParserOptions<AstNode>
  ): Doc {
    return printPreservingEmptyLines(path, print, options);
  }
}
