import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { TerminalNode } from './TerminalNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction } from '../types.d.ts';

export class FunctionTypeAttribute extends SlangNode {
  readonly kind = NonterminalKind.FunctionTypeAttribute;

  variant: TerminalNode;

  constructor(ast: ast.FunctionTypeAttribute) {
    super(ast);

    this.variant = new TerminalNode(ast.variant);
  }

  print(path: AstPath<FunctionTypeAttribute>, print: PrintFunction): Doc {
    return path.call(print, 'variant');
  }
}
