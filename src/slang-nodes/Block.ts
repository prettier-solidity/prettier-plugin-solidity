import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { Statements } from './Statements.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class Block implements SlangNode {
  readonly kind = NonterminalKind.Block;

  comments;

  loc;

  statements: Statements;

  constructor(ast: ast.Block) {
    let metadata = getNodeMetadata(ast);

    this.statements = new Statements(ast.statements);

    metadata = updateMetadata(metadata, [this.statements]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<Block>, print: PrintFunction): Doc {
    return ['{', path.call(print, 'statements'), '}'];
  }
}
