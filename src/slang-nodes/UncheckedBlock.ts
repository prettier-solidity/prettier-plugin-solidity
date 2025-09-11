import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { Block } from './Block.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class UncheckedBlock extends SlangNode {
  readonly kind = NonterminalKind.UncheckedBlock;

  block: Block;

  constructor(ast: ast.UncheckedBlock, options: ParserOptions<AstNode>) {
    super(ast);

    this.block = new Block(ast.block, options);

    this.updateMetadata(this.block);
  }

  print(path: AstPath<UncheckedBlock>, print: PrintFunction): Doc {
    return ['unchecked ', path.call(print, 'block')];
  }
}
