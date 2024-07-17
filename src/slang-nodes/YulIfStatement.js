import { SlangNode } from './SlangNode.js';
import { YulExpression } from './YulExpression.js';
import { YulBlock } from './YulBlock.js';

export class YulIfStatement extends SlangNode {
  ifKeyword;

  condition;

  body;

  constructor(ast, offset, comments, parse, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { ifKeyword, condition, body } = ast;
      this.ifKeyword = ifKeyword.text;
      this.condition = new YulExpression(
        condition,
        childrenOffsets.shift(),
        comments,
        parse,
        options
      );
      this.body = new YulBlock(
        body,
        childrenOffsets.shift(),
        comments,
        parse,
        options
      );
    };

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print) {
    return [
      `${this.ifKeyword} `,
      path.call(print, 'condition'),
      ' ',
      path.call(print, 'body')
    ];
  }
}
