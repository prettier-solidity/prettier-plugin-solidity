import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { YulStatements } from './YulStatements.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from '../slang-nodes';
import type { PrintFunction, SlangNode } from '../types';

export class YulBlock implements SlangNode {
  readonly kind = NonterminalKind.YulBlock;

  comments;

  loc;

  statements: YulStatements;

  constructor(ast: ast.YulBlock, options: ParserOptions<AstNode>) {
    let metadata = getNodeMetadata(ast);

    this.statements = new YulStatements(ast.statements, options);

    metadata = updateMetadata(metadata, [this.statements]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<YulBlock>, print: PrintFunction): Doc {
    return ['{', path.call(print, 'statements'), '}'];
  }
}
