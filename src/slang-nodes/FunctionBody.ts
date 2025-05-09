import { NonterminalKind, TerminalNode } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { Block } from './Block.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class FunctionBody implements SlangNode {
  readonly kind = NonterminalKind.FunctionBody;

  comments;

  loc;

  variant: Block | string;

  constructor(ast: ast.FunctionBody) {
    let metadata = getNodeMetadata(ast);

    this.variant =
      ast.variant instanceof TerminalNode
        ? ast.variant.unparse()
        : new Block(ast.variant);

    metadata = updateMetadata(
      metadata,
      typeof this.variant === 'string' ? [] : [this.variant]
    );

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<FunctionBody>, print: PrintFunction): Doc {
    return typeof this.variant === 'string'
      ? this.variant
      : path.call(print, 'variant');
  }
}
