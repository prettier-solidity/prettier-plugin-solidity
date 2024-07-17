import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';
import { YulSwitchCase } from './YulSwitchCase.js';

const { hardline, join } = doc.builders;

export class YulSwitchCases extends SlangNode {
  items;

  constructor(ast, offset, comments, parse, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { items } = ast;
      this.items = items.map(
        (item) =>
          new YulSwitchCase(
            item,
            childrenOffsets.shift(),
            comments,
            parse,
            options
          )
      );
    };

    this.initialize(ast, offset, comments, fetch, parse);
  }

  print(path, print) {
    return join(hardline, path.map(print, 'items'));
  }
}
