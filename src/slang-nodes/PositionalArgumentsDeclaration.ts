import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { isBlockComment } from '../slang-utils/is-comment.js';
import { PositionalArguments } from './PositionalArguments.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class PositionalArgumentsDeclaration implements SlangNode {
  readonly kind = NonterminalKind.PositionalArgumentsDeclaration;

  comments;

  loc;

  isEmpty;

  arguments: PositionalArguments;

  constructor(
    ast: ast.PositionalArgumentsDeclaration,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast);

    this.arguments = new PositionalArguments(ast.arguments, options);

    metadata = updateMetadata(metadata, [this.arguments]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;

    // We need to check the comments at this point because they will be removed
    // from this node into the root node.
    const empty =
      this.arguments.items.length === 0 && // no arguments
      !this.comments.some((comment) => isBlockComment(comment)); // no block comments

    this.isEmpty = (): boolean => empty;
  }

  print(
    path: AstPath<PositionalArgumentsDeclaration>,
    print: PrintFunction
  ): Doc {
    return ['(', path.call(print, 'arguments'), ')'];
  }
}
