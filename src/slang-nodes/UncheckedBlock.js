import { SlangNode } from './SlangNode.js';
import { Block } from './Block.js';

export class UncheckedBlock extends SlangNode {
  uncheckedKeyword;

  block;

  constructor(ast, offset, comments, parse, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { uncheckedKeyword, block } = ast;
      this.uncheckedKeyword = uncheckedKeyword.text;
      this.block = new Block(
        block,
        childrenOffsets.shift(),
        comments,
        parse,
        options
      );
    };

    this.initialize(ast, offset, comments, fetch, parse);
  }

  print(path, print) {
    return [`${this.uncheckedKeyword} `, path.call(print, 'block')];
  }
}
