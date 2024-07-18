import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import {
  printSeparatedItem,
  printSeparatedList
} from '../common/printer-helpers.js';
import { printComments } from '../slang-printers/print-comments.js';
import { SlangNode } from './SlangNode.js';
import { Parameter } from './Parameter.js';

export class Parameters extends SlangNode {
  get kind() {
    return NonterminalKind.Parameters;
  }

  items;

  separators;

  constructor(ast, offset, options) {
    super();

    const fetch =
      typeof offset !== 'undefined'
        ? (childrenOffsets) => ({
            items: ast.items.map(
              (item) => new Parameter(item, childrenOffsets.shift(), options)
            ),
            separators: ast.separators.map((separator) => separator.text)
          })
        : undefined;

    this.initialize(ast, offset, fetch);
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
