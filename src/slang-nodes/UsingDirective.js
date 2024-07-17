import { SlangNode } from './SlangNode.js';
import { UsingClause } from './UsingClause.js';
import { UsingTarget } from './UsingTarget.js';

export class UsingDirective extends SlangNode {
  usingKeyword;

  clause;

  forKeyword;

  target;

  globalKeyword;

  semicolon;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => {
      const {
        usingKeyword,
        clause,
        forKeyword,
        target,
        globalKeyword,
        semicolon
      } = ast;
      this.usingKeyword = usingKeyword.text;
      this.clause = new UsingClause(
        clause,
        childrenOffsets.shift(),
        comments,
        options
      );
      this.forKeyword = forKeyword.text;
      this.target = new UsingTarget(
        target,
        childrenOffsets.shift(),
        comments,
        options
      );
      this.globalKeyword = globalKeyword?.text;
      this.semicolon = semicolon.text;
    };

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print) {
    return [
      `${this.usingKeyword} `,
      path.call(print, 'clause'),
      ` ${this.forKeyword} `,
      path.call(print, 'target'),
      `${this.globalKeyword ? ` ${this.globalKeyword}` : ''}${this.semicolon}`
    ];
  }
}
