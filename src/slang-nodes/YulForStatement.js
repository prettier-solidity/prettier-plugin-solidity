import { SlangNode } from './SlangNode.js';
import { YulBlock } from './YulBlock.js';
import { YulExpression } from './YulExpression.js';

export class YulForStatement extends SlangNode {
  forKeyword;

  initialization;

  condition;

  iterator;

  body;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      forKeyword: ast.forKeyword.text,
      initialization: new YulBlock(
        ast.initialization,
        childrenOffsets.shift(),
        comments,
        options
      ),
      condition: new YulExpression(
        ast.condition,
        childrenOffsets.shift(),
        comments,
        options
      ),
      iterator: new YulBlock(
        ast.iterator,
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
      `${this.forKeyword} `,
      path.call(print, 'initialization'),
      ' ',
      path.call(print, 'condition'),
      ' ',
      path.call(print, 'iterator'),
      ' ',
      path.call(print, 'body')
    ];
  }
}
