import { printSeparatedList } from '../common/printer-helpers.js';
import { SlangNode } from './SlangNode.js';

export class PositionalArguments extends SlangNode {
  items;

  separators;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.items = ast.items.map((item) =>
      parse(item, parse, this.nextChildOffset)
    );
    this.separators = ast.separators.map((separator) => separator.text);
    this.initiateLoc(ast);
  }

  print(path, print) {
    return this.items.length > 0
      ? printSeparatedList(path.map(print, 'items'))
      : '';
  }
}
