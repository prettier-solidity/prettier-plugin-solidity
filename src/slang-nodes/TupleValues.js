import { printSeparatedList } from '../common/printer-helpers.js';
import { isBinaryOperation } from '../slang-utils/is-binary-operation.js';
import { SlangNode } from './SlangNode.js';

export class TupleValues extends SlangNode {
  items;

  separators;

  constructor(ast, offset, comments, parse) {
    super();
    if (offset) {
      this.initialize(ast, offset, comments, parse);
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
