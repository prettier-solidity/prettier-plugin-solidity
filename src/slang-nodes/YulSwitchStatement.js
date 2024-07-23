import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { YulExpression } from './YulExpression.js';
import { YulSwitchCases } from './YulSwitchCases.js';

const { hardline } = doc.builders;

export class YulSwitchStatement extends SlangNode {
  get kind() {
    return NonterminalKind.YulSwitchStatement;
  }

  switchKeyword;

  expression;

  cases;

  constructor(ast, offset, options) {
    super();

    const fetch = (offsets) => ({
      switchKeyword: ast.switchKeyword.text,
      expression: new YulExpression(ast.expression, offsets[0], options),
      cases: new YulSwitchCases(ast.cases, offsets[1], options)
    });

    this.initialize(ast, offset, fetch);
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
