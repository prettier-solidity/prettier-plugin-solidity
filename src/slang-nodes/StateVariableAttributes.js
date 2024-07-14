import { SlangNode } from './SlangNode.js';

export class StateVariableAttributes extends SlangNode {
  items;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.parseChildrenNodes(ast, parse);
    this.initializeLoc(ast);
  }

  print(path, print) {
    return this.items.length
      ? path.map(print, 'items').map((item) => [' ', item])
      : '';
  }
}
