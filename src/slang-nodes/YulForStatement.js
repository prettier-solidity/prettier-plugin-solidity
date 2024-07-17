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

    const fetch = (childrenOffsets) => {
      const { forKeyword, initialization, condition, iterator, body } = ast;
      this.forKeyword = forKeyword.text;
      this.initialization = new YulBlock(
        initialization,
        childrenOffsets.shift(),
        comments,
        options
      );
      this.condition = new YulExpression(
        condition,
        childrenOffsets.shift(),
        comments,
        options
      );
      this.iterator = new YulBlock(
        iterator,
        childrenOffsets.shift(),
        comments,
        options
      );
      this.body = new YulBlock(
        body,
        childrenOffsets.shift(),
        comments,
        options
      );
    };

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
