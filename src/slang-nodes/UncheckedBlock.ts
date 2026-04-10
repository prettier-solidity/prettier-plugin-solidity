import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { Block } from './Block.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { PrintableNode } from './types.d.ts';

export class UncheckedBlock extends SlangNode {
  readonly kind = NonterminalKind.UncheckedBlock;

  block: Block;

  constructor(
    ast: ast.UncheckedBlock,
    collected: CollectedMetadata,
    options: ParserOptions<PrintableNode>
  ) {
    super(ast, collected);

    this.block = new Block(ast.block, collected, options);

    this.updateMetadata(this.block);
  }

  print(print: PrintFunction): Doc {
    return ['unchecked ', print('block')];
  }
}
