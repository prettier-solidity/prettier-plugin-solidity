import { printSeparatedList } from '../common/printer-helpers.js';
import { isBinaryOperation } from '../common/slang-helpers.js';
import { SlangNode } from './SlangNode.js';

export class TupleValues extends SlangNode {
  items;

  separators;

  constructor({ ast, parse, offset, kind, loc, items, separators }) {
    super(ast, offset);
    if (ast) {
      this.items = ast.items.map((item) =>
        parse(item, parse, this.nextChildOffset)
      );
      this.separators = ast.separators.map((separator) => separator.text);
      this.initiateLoc(ast);
    } else {
      this.kind = kind;
      this.loc = loc;
      this.items = items;
      this.separators = separators;
    }
  }

  print({ path, print }) {
    return this.items.length === 1 &&
      isBinaryOperation(this.items[0].expression.variant)
      ? path.map(print, 'items')
      : printSeparatedList(path.map(print, 'items'));
  }
}
