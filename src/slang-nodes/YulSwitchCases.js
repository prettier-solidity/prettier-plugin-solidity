import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';
import { YulSwitchCase } from './YulSwitchCase.js';

const { hardline, join } = doc.builders;

export class YulSwitchCases extends SlangNode {
  items;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      items: ast.items.map(
        (item) =>
          new YulSwitchCase(item, childrenOffsets.shift(), comments, options)
      )
    });

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print) {
    return join(hardline, path.map(print, 'items'));
  }
}
