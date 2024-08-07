import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { IdentifierPath } from './IdentifierPath.js';
import { ArgumentsDeclaration } from './ArgumentsDeclaration.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from '../slang-nodes';
import type { PrintFunction, SlangNode } from '../types';

export class RevertStatement implements SlangNode {
  readonly kind = NonterminalKind.RevertStatement;

  comments;

  loc;

  error?: IdentifierPath;

  arguments: ArgumentsDeclaration;

  constructor(
    ast: ast.RevertStatement,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    let i = 0;
    if (ast.error) {
      this.error = new IdentifierPath(ast.error, offsets[i]);
      i += 1;
    }
    this.arguments = new ArgumentsDeclaration(
      ast.arguments,
      offsets[i],
      options
    );

    metadata = updateMetadata(metadata, [this.error, this.arguments]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<RevertStatement>, print: PrintFunction): Doc {
    return [
      'revert ',
      this.error ? path.call(print, 'error') : '',
      path.call(print, 'arguments'),
      ';'
    ];
  }
}
