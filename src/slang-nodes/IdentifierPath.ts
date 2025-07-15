import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { TerminalNode } from './TerminalNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction } from '../types.d.ts';

export class IdentifierPath extends SlangNode {
  readonly kind = NonterminalKind.IdentifierPath;

  items: TerminalNode[];

  separators: string[];

  constructor(ast: ast.IdentifierPath) {
    super(ast);

    this.items = ast.items.map((item) => new TerminalNode(item));
    this.separators = ast.separators.map((separator) => separator.unparse());
  }

  print(path: AstPath<IdentifierPath>, print: PrintFunction): Doc {
    return path
      .map(print, 'items')
      .map((item, index) =>
        index === 0 ? item : [this.separators[index - 1], item]
      );
  }
}
