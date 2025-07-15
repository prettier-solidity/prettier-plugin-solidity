import {
  NonterminalKind,
  TerminalNode as SlangTerminalNode
} from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { ExpressionStatement } from './ExpressionStatement.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';
import { TerminalNode } from './TerminalNode.js';

export class ForStatementCondition extends SlangNode {
  readonly kind = NonterminalKind.ForStatementCondition;

  variant: ExpressionStatement | TerminalNode;

  constructor(ast: ast.ForStatementCondition, options: ParserOptions<AstNode>) {
    super(ast);

    const variant = ast.variant;
    if (variant instanceof SlangTerminalNode) {
      this.variant = new TerminalNode(variant);
      return;
    }
    this.variant = new ExpressionStatement(variant, options);

    this.updateMetadata(this.variant);
  }

  print(path: AstPath<ForStatementCondition>, print: PrintFunction): Doc {
    return path.call(print, 'variant');
  }
}
