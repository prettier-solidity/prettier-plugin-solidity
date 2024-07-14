import {
  printSeparatedItem,
  printSeparatedList
} from '../common/printer-helpers.js';
import { printComments } from '../common/slang-helpers.js';
import { SlangNode } from './SlangNode.js';

export class Parameters extends SlangNode {
  items;

  separators;

  constructor(ast, offset, parse) {
    super(ast, offset);
    if (offset) {
      this.parseChildrenNodes(ast, parse);
      this.initializeLoc(ast);
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
