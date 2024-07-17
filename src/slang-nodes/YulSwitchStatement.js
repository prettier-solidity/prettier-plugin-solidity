import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';
import { YulExpression } from './YulExpression.js';
import { YulSwitchCases } from './YulSwitchCases.js';

const { hardline } = doc.builders;

export class YulSwitchStatement extends SlangNode {
  switchKeyword;

  expression;

  cases;

  constructor(ast, offset, comments, parse, options) {
    super();

    const fetch = (childrenOffsets) => ({
      switchKeyword: ast.switchKeyword.text,
      expression: new YulExpression(
        ast.expression,
        childrenOffsets.shift(),
        comments,
        parse,
        options
      ),
      cases: new YulSwitchCases(
        ast.cases,
        childrenOffsets.shift(),
        comments,
        parse,
        options
      )
    });

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print) {
    return [
      `${this.switchKeyword} `,
      path.call(print, 'expression'),
      hardline,
      path.call(print, 'cases')
    ];
  }
}
