import { SlangNode } from './SlangNode.js';
import { StateVariableAttribute } from './StateVariableAttribute.js';

export class StateVariableAttributes extends SlangNode {
  items;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { items } = ast;
      this.items = items.map(
        (item) =>
          new StateVariableAttribute(
            item,
            childrenOffsets.shift(),
            comments,
            options
          )
      );
    };

    this.initialize(ast, offset, comments, fetch);
  }

  print(path, print) {
    return this.items.length
      ? path.map(print, 'items').map((item) => [' ', item])
      : '';
  }
}
