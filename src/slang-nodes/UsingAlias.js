import { SlangNode } from './SlangNode.js';
import { UsingOperator } from './UsingOperator.js';

export class UsingAlias extends SlangNode {
  asKeyword;

  operator;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { asKeyword, operator } = ast;
      this.asKeyword = asKeyword.text;
      this.operator = new UsingOperator(
        operator,
        childrenOffsets.shift(),
        comments,
        options
      );
    };

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print) {
    return [` ${this.asKeyword} `, path.call(print, 'operator')];
  }
}
