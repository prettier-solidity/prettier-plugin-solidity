import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';

export class VariableDeclarationValue extends SlangNode {
  equal;

  expression;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { equal, expression } = ast;
      this.equal = equal.text;
      this.expression = new Expression(
        expression,
        childrenOffsets.shift(),
        comments,
        options
      );
    };

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print) {
    return [` ${this.equal} `, path.call(print, 'expression')];
  }
}
