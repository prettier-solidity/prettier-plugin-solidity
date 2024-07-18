import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { CatchClause } from './CatchClause.js';

const { join } = doc.builders;

export class CatchClauses extends SlangNode {
  get kind() {
    return NonterminalKind.CatchClauses;
  }

  items;

  constructor(ast, offset, options) {
    super();

    const fetch = (childrenOffsets) => ({
      items: ast.items.map(
        (item) => new CatchClause(item, childrenOffsets.shift(), options)
      )
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return join(' ', path.map(print, 'items'));
  }
}
