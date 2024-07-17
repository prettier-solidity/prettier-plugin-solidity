import { SlangNode } from './SlangNode.js';
import { UsingOperator } from './UsingOperator.js';

export class UsingAlias extends SlangNode {
  asKeyword;

  operator;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      asKeyword: ast.asKeyword.text,
      operator: new UsingOperator(
        ast.operator,
        childrenOffsets.shift(),
        comments,
        options
      )
    });

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print) {
    return [` ${this.asKeyword} `, path.call(print, 'operator')];
  }
}
