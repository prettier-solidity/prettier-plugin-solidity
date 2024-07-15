import { SlangNode } from './SlangNode.js';

export class StateVariableAttributes extends SlangNode {
  items;

  constructor(ast, offset, comments, parse) {
    super(ast, offset, comments);
    this.initialize(ast, parse);
    this.finalize(ast);
  }

  print(path, print) {
    return this.items.length
      ? path.map(print, 'items').map((item) => [' ', item])
      : '';
  }
}
