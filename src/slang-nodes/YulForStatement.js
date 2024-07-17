import { SlangNode } from './SlangNode.js';
import { YulBlock } from './YulBlock.js';
import { YulExpression } from './YulExpression.js';

export class YulForStatement extends SlangNode {
  forKeyword;

  initialization;

  condition;

  iterator;

  body;

  constructor(ast, offset, comments, parse, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { forKeyword, initialization, condition, iterator, body } = ast;
      this.forKeyword = forKeyword.text;
      this.initialization = new YulBlock(
        initialization,
        childrenOffsets.shift(),
        comments,
        parse,
        options
      );
      this.condition = new YulExpression(
        condition,
        childrenOffsets.shift(),
        comments,
        parse,
        options
      );
      this.iterator = new YulBlock(
        iterator,
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

    this.initialize(ast, offset, comments, fetch, parse);
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
