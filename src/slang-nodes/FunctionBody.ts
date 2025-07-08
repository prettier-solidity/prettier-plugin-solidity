import { NonterminalKind, TerminalNode } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { Block } from './Block.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class FunctionBody implements SlangNode {
  readonly kind = NonterminalKind.FunctionBody;

  comments;

  loc;

  variant: Block | string;

  constructor(ast: ast.FunctionBody, options: ParserOptions<AstNode>) {
    [this.loc, this.comments] = getNodeMetadata(ast);

    this.variant =
      ast.variant instanceof TerminalNode
        ? ast.variant.unparse()
        : new Block(ast.variant, options);

    updateMetadata(
      this.loc,
      this.comments,
      typeof this.variant === 'string' ? [] : [this.variant]
    );
  }

  print(path: AstPath<FunctionBody>, print: PrintFunction): Doc {
    return typeof this.variant === 'string'
      ? this.variant
      : path.call(print, 'variant');
  }
}
