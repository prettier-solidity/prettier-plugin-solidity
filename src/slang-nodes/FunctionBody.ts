import {
  NonterminalKind,
  TerminalNode as SlangTerminalNode
} from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { Block } from './Block.js';
import { TerminalNode } from './TerminalNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

export class FunctionBody extends SlangNode {
  readonly kind = NonterminalKind.FunctionBody;

  variant: Block | TerminalNode;

  constructor(ast: ast.FunctionBody, options: ParserOptions<AstNode>) {
    super(ast);

    const variant = ast.variant;
    if (variant instanceof SlangTerminalNode) {
      this.variant = new TerminalNode(variant);
      return;
    }
    this.variant = new Block(variant, options);

    this.updateMetadata(this.variant);
  }

  print(path: AstPath<FunctionBody>, print: PrintFunction): Doc {
    return path.call(print, 'variant');
  }
}
