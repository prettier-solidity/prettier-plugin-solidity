import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { SourceUnitMembers } from './SourceUnitMembers.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

const { line } = doc.builders;

export class SourceUnit extends SlangNode {
  readonly kind = NonterminalKind.SourceUnit;

  members: SourceUnitMembers;

  constructor(ast: ast.SourceUnit, options: ParserOptions<AstNode>) {
    super(ast);

    this.members = new SourceUnitMembers(ast.members, options);

    this.updateMetadata(this.members);

    // Because of comments being extracted like a russian doll, the order needs
    // to be fixed at the end.
    this.comments = this.comments.sort((a, b) => a.loc.start - b.loc.start);
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
