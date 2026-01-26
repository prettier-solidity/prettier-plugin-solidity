import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { TerminalNode } from './TerminalNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class ImportAlias extends SlangNode {
  readonly kind = NonterminalKind.ImportAlias;

  identifier: TerminalNode;

  constructor(ast: ast.ImportAlias, options: ParserOptions<AstNode>) {
    super(ast, options);

    this.identifier = new TerminalNode(ast.identifier, options);
  }

  print(path: AstPath<ImportAlias>, print: PrintFunction): Doc {
    return [' as ', path.call(print, 'identifier')];
  }
}
