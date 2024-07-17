import { SlangNode } from './SlangNode.js';
import { YulExpression } from './YulExpression.js';
import { YulBlock } from './YulBlock.js';

export class YulIfStatement extends SlangNode {
  ifKeyword;

  condition;

  body;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      ifKeyword: ast.ifKeyword.text,
      condition: new YulExpression(
        ast.condition,
        childrenOffsets.shift(),
        comments,
        options
      ),
      body: new YulBlock(ast.body, childrenOffsets.shift(), comments, options)
    });

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
