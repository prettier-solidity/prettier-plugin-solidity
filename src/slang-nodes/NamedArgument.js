import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';

export class NamedArgument extends SlangNode {
  name;

  colon;

  value;

  constructor(ast, offset, options) {
    super();

    const fetch = (childrenOffsets) => ({
      name: ast.name.text,
      colon: ast.colon.text,
      value: new Expression(ast.value, childrenOffsets.shift(), options)
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return [`${this.name}${this.colon} `, path.call(print, 'value')];
  }
}
