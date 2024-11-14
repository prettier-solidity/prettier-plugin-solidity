import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { createKindCheckFunction } from '../slang-utils/create-kind-check-function.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { Statement } from './Statement.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

const { group, indent, line } = doc.builders;

const isIfStatementOrBlock = createKindCheckFunction([
  NonterminalKind.Block,
  NonterminalKind.IfStatement
]);

export class ElseBranch implements SlangNode {
  readonly kind = NonterminalKind.ElseBranch;

  comments;

  loc;

  body: Statement;

  constructor(ast: ast.ElseBranch, options: ParserOptions<AstNode>) {
    let metadata = getNodeMetadata(ast);

    this.body = new Statement(ast.body, options);

    metadata = updateMetadata(metadata, [this.body]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<ElseBranch>, print: PrintFunction): Doc {
    return [
      'else',
      isIfStatementOrBlock(this.body.variant)
        ? [' ', path.call(print, 'body')]
        : group(indent([line, path.call(print, 'body')]))
    ];
  }
}
