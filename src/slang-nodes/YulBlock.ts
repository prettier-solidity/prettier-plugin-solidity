import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { YulStatements } from './YulStatements.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class YulBlock implements SlangNode {
  readonly kind = NonterminalKind.YulBlock;

  comments;

  loc;

  statements: YulStatements;

  constructor(ast: ast.YulBlock, options: ParserOptions<AstNode>) {
    [this.loc, this.comments] = getNodeMetadata(ast);

    this.statements = new YulStatements(ast.statements, options);

    updateMetadata(this.loc, this.comments, [this.statements]);
  }

  print(path: AstPath<YulBlock>, print: PrintFunction): Doc {
    return ['{', path.call(print, 'statements'), '}'];
  }
}
