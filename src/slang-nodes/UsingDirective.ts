import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { UsingClause } from './UsingClause.js';
import { UsingTarget } from './UsingTarget.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { SlangNode } from '../types.js';

export class UsingDirective implements SlangNode {
  readonly kind = NonterminalKind.UsingDirective;

  comments;

  loc;

  usingKeyword: string;

  clause: UsingClause;

  forKeyword: string;

  target: UsingTarget;

  globalKeyword?: string;

  semicolon: string;

  constructor(ast: ast.UsingDirective, offset: number, options: ParserOptions) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.usingKeyword = ast.usingKeyword.text;
    this.clause = new UsingClause(ast.clause, offsets[0]);
    this.forKeyword = ast.forKeyword.text;
    this.target = new UsingTarget(ast.target, offsets[1], options);
    this.globalKeyword = ast.globalKeyword?.text;
    this.semicolon = ast.semicolon.text;

    metadata = updateMetadata(metadata, [this.clause, this.target]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath, print: (path: AstPath) => Doc): Doc {
    return [
      `${this.usingKeyword} `,
      path.call(print, 'clause'),
      ` ${this.forKeyword} `,
      path.call(print, 'target'),
      `${this.globalKeyword ? ` ${this.globalKeyword}` : ''}${this.semicolon}`
    ];
  }
}
