import { doc } from 'prettier';
import { printSeparatedList } from '../common/printer-helpers.js';
import { SlangNode } from './SlangNode.js';
import { NamedArgument } from './NamedArgument.js';

const { line, softline } = doc.builders;

export class CallOptions extends SlangNode {
  items;

  separators;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { items, separators } = ast;
      this.items = items.map(
        (item) =>
          new NamedArgument(item, childrenOffsets.shift(), comments, options)
      );
      this.separators = separators.map((separator) => separator.text);
    };

    this.initialize(ast, offset, comments, fetch);
  }

  print(path, print, options) {
    return printSeparatedList(path.map(print, 'items'), {
      firstSeparator: options.bracketSpacing ? line : softline
    });
  }
}
