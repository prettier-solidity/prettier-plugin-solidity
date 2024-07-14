import { printSeparatedList } from '../common/printer-helpers.js';
import { isBinaryOperation } from '../common/slang-helpers.js';
import { SlangNode } from './SlangNode.js';

export class TupleValues extends SlangNode {
  items;

  separators;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    if (offset) {
      this.items = ast.items.map((item) => parse(item, this.nextChildOffset));
      this.separators = ast.separators.map((separator) => separator.text);
      this.initiateLoc(ast);
    } else {
      this.kind = ast.kind;
      this.loc = ast.loc;
      this.items = ast.items;
      this.separators = ast.separators;
    }
  }

  print(path, print) {
    return this.items.length === 1 &&
      isBinaryOperation(this.items[0].expression.variant)
      ? path.map(print, 'items')
      : printSeparatedList(path.map(print, 'items'));
  }
}
