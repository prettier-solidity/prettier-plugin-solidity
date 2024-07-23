import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { UsingClause } from './UsingClause.js';
import { UsingTarget } from './UsingTarget.js';

export class UsingDirective extends SlangNode {
  get kind() {
    return NonterminalKind.UsingDirective;
  }

  usingKeyword;

  clause;

  forKeyword;

  target;

  globalKeyword;

  semicolon;

  constructor(ast, offset, options) {
    super();

    const fetch = (offsets) => ({
      usingKeyword: ast.usingKeyword.text,
      clause: new UsingClause(ast.clause, offsets[0], options),
      forKeyword: ast.forKeyword.text,
      target: new UsingTarget(ast.target, offsets[1], options),
      globalKeyword: ast.globalKeyword?.text,
      semicolon: ast.semicolon.text
    });

    this.initialize(ast, offset, fetch);
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
