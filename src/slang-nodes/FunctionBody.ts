import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { TerminalNode } from '@nomicfoundation/slang/cst/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { Block } from './Block.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from '../slang-nodes';
import type { PrintFunction, SlangNode } from '../types';

export class FunctionBody implements SlangNode {
  readonly kind = NonterminalKind.FunctionBody;

  comments;

  loc;

  variant: Block | string;

  constructor(
    ast: ast.FunctionBody,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.variant =
      ast.variant instanceof TerminalNode
        ? ast.variant.text
        : new Block(ast.variant, offsets[0], options);

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
