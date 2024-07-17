import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';

export class NamedArgument extends SlangNode {
  name;

  colon;

  value;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { name, colon, value } = ast;
      this.name = name.text;
      this.colon = colon.text;
      this.value = new Expression(
        value,
        childrenOffsets.shift(),
        comments,
        options
      );
    };

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print) {
    return [`${this.name}${this.colon} `, path.call(print, 'value')];
  }
}
