import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';
import { SourceUnitMembers } from './SourceUnitMembers.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

const { line } = doc.builders;

export class SourceUnit extends SlangNode {
  readonly kind = NonterminalKind.SourceUnit;

  members: SourceUnitMembers;

  constructor(
    ast: ast.SourceUnit,
    collected: CollectedMetadata,
    options: ParserOptions<AstNode>
  ) {
    super(ast, collected);

    this.members = new SourceUnitMembers(ast.members, collected, options);

    this.updateMetadata(this.members);
  }

  print(
    path: AstPath<SourceUnit>,
    print: PrintFunction,
    options: ParserOptions<AstNode>
  ): Doc {
    return [
      path.call(print, 'members'),
      // Prettier's Markdown formatter already appends a new line on code
      // blocks, therefore we avoid trailing with a new line at the end of
      // a file in this case.
      // https://github.com/prettier-solidity/prettier-plugin-solidity/issues/764
      options.parentParser ? '' : line
    ];
  }
}
