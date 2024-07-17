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

    const fetch = (childrenOffsets) => ({
      usingKeyword: ast.usingKeyword.text,
      clause: new UsingClause(
        ast.clause,
        childrenOffsets.shift(),
        comments,
        options
      ),
      forKeyword: ast.forKeyword.text,
      target: new UsingTarget(
        ast.target,
        childrenOffsets.shift(),
        comments,
        options
      ),
      globalKeyword: ast.globalKeyword?.text,
      semicolon: ast.semicolon.text
    });

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
