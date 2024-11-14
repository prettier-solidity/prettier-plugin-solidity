import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { joinExisting } from '../slang-utils/join-existing.js';
import { UsingClause } from './UsingClause.js';
import { UsingTarget } from './UsingTarget.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class UsingDirective implements SlangNode {
  readonly kind = NonterminalKind.UsingDirective;

  comments;

  loc;

  clause: UsingClause;

  target: UsingTarget;

  globalKeyword?: string;

  constructor(ast: ast.UsingDirective, options: ParserOptions<AstNode>) {
    let metadata = getNodeMetadata(ast);

    this.clause = new UsingClause(ast.clause);
    this.target = new UsingTarget(ast.target, options);
    this.globalKeyword = ast.globalKeyword?.unparse();

    metadata = updateMetadata(metadata, [this.clause, this.target]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<UsingDirective>, print: PrintFunction): Doc {
    return [
      joinExisting(' ', [
        'using',
        path.call(print, 'clause'),
        'for',
        path.call(print, 'target'),
        this.globalKeyword
      ]),
      ';'
    ];
  }
}
