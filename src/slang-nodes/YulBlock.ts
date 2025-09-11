import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { YulStatements } from './YulStatements.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class YulBlock extends SlangNode {
  readonly kind = NonterminalKind.YulBlock;

  statements: YulStatements;

  constructor(ast: ast.YulBlock, options: ParserOptions<AstNode>) {
    super(ast);

    this.statements = new YulStatements(ast.statements, options);

    this.updateMetadata(this.statements);
  }

  print(path: AstPath<YulBlock>, print: PrintFunction): Doc {
    return ['{', path.call(print, 'statements'), '}'];
  }
}
