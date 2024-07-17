import { SlangNode } from './SlangNode.js';
import { YulBlock } from './YulBlock.js';

export class YulDefaultCase extends SlangNode {
  defaultKeyword;

  body;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      defaultKeyword: ast.defaultKeyword.text,
      body: new YulBlock(ast.body, childrenOffsets.shift(), comments, options)
    });

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print) {
    return [`${this.defaultKeyword} `, path.call(print, 'body')];
  }
}
