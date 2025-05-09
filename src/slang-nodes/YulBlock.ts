import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { YulStatements } from './YulStatements.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class YulBlock implements SlangNode {
  readonly kind = NonterminalKind.YulBlock;

  comments;

  loc;

  statements: YulStatements;

  constructor(ast: ast.YulBlock) {
    let metadata = getNodeMetadata(ast);

    this.statements = new YulStatements(ast.statements);

    metadata = updateMetadata(metadata, [this.statements]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<YulBlock>, print: PrintFunction): Doc {
    return ['{', path.call(print, 'statements'), '}'];
  }
}
