import { SlangNode } from './SlangNode.js';
import { YulBlock } from './YulBlock.js';

export class YulDefaultCase extends SlangNode {
  defaultKeyword;

  body;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { defaultKeyword, body } = ast;
      this.defaultKeyword = defaultKeyword.text;
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
    return [`${this.defaultKeyword} `, path.call(print, 'body')];
  }
}
