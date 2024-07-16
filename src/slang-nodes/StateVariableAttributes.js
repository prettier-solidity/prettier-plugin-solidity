import { SlangNode } from './SlangNode.js';

export class StateVariableAttributes extends SlangNode {
  items;

  constructor(ast, offset, comments, parse) {
    super();
    this.initialize(ast, offset, comments, parse);
  }

  print(path, print) {
    return this.items.length
      ? path.map(print, 'items').map((item) => [' ', item])
      : '';
  }
}
