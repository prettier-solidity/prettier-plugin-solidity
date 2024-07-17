import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';
import { CatchClause } from './CatchClause.js';

const { join } = doc.builders;

export class CatchClauses extends SlangNode {
  items;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      items: ast.items.map(
        (item) =>
          new CatchClause(item, childrenOffsets.shift(), comments, options)
      )
    });

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print) {
    return join(' ', path.map(print, 'items'));
  }
}
