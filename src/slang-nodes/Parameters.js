import {
  printSeparatedItem,
  printSeparatedList
} from '../common/printer-helpers.js';
import { printComments } from '../slang-printers/print-comments.js';
import { SlangNode } from './SlangNode.js';
import { Parameter } from './Parameter.js';

export class Parameters extends SlangNode {
  items;

  separators;

  constructor(ast, offset, comments, options) {
    super();
    if (offset) {
      const fetch = (childrenOffsets) => {
        const { items, separators } = ast;
        this.items = items.map(
          (item) =>
            new Parameter(item, childrenOffsets.shift(), comments, options)
        );
        this.separators = separators.map((separator) => separator.text);
      };

      this.initialize(ast, offset, comments, fetch);
    } else {
      this.kind = ast.kind;
      this.loc = ast.loc;
      this.items = ast.items;
      this.separators = ast.separators;
    }
  }

  print(path, print, options) {
    if (this.items.length > 0) {
      return printSeparatedList(path.map(print, 'items'), { grouped: false });
    }

    const parameterComments = printComments(this, path, options);

    return parameterComments.length > 0
      ? printSeparatedItem(parameterComments)
      : '';
  }
}
