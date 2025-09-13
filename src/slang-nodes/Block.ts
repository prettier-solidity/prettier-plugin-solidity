import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { Statements } from './Statements.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class Block extends SlangNode {
  readonly kind = NonterminalKind.Block;

  statements: Statements;

  constructor(ast: ast.Block, options: ParserOptions<AstNode>) {
    super(ast);

    this.statements = new Statements(ast.statements, options);

    this.updateMetadata(this.statements);
  }

  print(path: AstPath<Block>, print: PrintFunction): Doc {
    return ['{', path.call(print, 'statements'), '}'];
  }
}
