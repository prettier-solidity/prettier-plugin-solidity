import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { isBlockComment } from '../slang-utils/is-comment.js';
import { SlangNode } from './SlangNode.js';
import { PositionalArguments } from './PositionalArguments.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class PositionalArgumentsDeclaration extends SlangNode {
  readonly kind = NonterminalKind.PositionalArgumentsDeclaration;

  isEmpty;

  arguments: PositionalArguments;

  constructor(
    ast: ast.PositionalArgumentsDeclaration,
    options: ParserOptions<AstNode>
  ) {
    super(ast);

    this.arguments = new PositionalArguments(ast.arguments, options);

    this.updateMetadata(this.arguments);

    // We need to check the comments at this point because they will be removed
    // from this node into the root node.
    // Since we are collecting comments in a different array, we have to query
    // the ast directly for possible block comments.
    this.isEmpty =
      this.arguments.items.length === 0 && // no arguments
      !ast.cst.children().some(({ node }) => isBlockComment(node)); // no block comments
  }

  print(
    path: AstPath<PositionalArgumentsDeclaration>,
    print: PrintFunction
  ): Doc {
    return ['(', path.call(print, 'arguments'), ')'];
  }
}
