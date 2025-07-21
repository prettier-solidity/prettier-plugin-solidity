import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { TerminalNode } from './TerminalNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction } from '../types.d.ts';

export class FunctionName extends SlangNode {
  readonly kind = NonterminalKind.FunctionName;

  variant: TerminalNode;

  constructor(ast: ast.FunctionName) {
    super(ast);

    this.variant = new TerminalNode(ast.variant);
  }

  print(path: AstPath<FunctionName>, print: PrintFunction): Doc {
    return path.call(print, 'variant');
  }
}
