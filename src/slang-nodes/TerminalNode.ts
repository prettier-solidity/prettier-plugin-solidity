import { SlangNode } from './SlangNode.js';

import type {
  TerminalNode as SlangTerminalNode,
  TerminalKind
} from '@nomicfoundation/slang/cst';
import type { Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';

export class TerminalNode extends SlangNode {
  kind: TerminalKind;

  value: string;

  constructor(ast: SlangTerminalNode, options: ParserOptions<AstNode>) {
    super(ast, options);

    this.kind = ast.kind;
    this.value = ast.unparse();
  }

  print(): Doc {
    return this.value;
  }
}
