import { doc } from 'prettier';
import { printSeparatedList } from '../common/printer-helpers.js';
import { SlangNode } from './SlangNode.js';
import { NamedArgument } from './NamedArgument.js';

const { line, softline } = doc.builders;

export class NamedArguments extends SlangNode {
  items;

  separators;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      items: ast.items.map(
        (item) =>
          new NamedArgument(item, childrenOffsets.shift(), comments, options)
      ),
      separators: ast.separators.map((separator) => separator.text)
    });

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print, options) {
    return printSeparatedList(path.map(print, 'items'), {
      firstSeparator: options.bracketSpacing ? line : softline
    });
  }
}
