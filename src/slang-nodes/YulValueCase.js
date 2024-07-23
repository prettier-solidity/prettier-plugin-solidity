import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { YulLiteral } from './YulLiteral.js';
import { YulBlock } from './YulBlock.js';

export class YulValueCase extends SlangNode {
  get kind() {
    return NonterminalKind.YulValueCase;
  }

  caseKeyword;

  value;

  body;

  constructor(ast, offset, options) {
    super();

    const fetch = (offsets) => ({
      caseKeyword: ast.caseKeyword.text,
      value: new YulLiteral(ast.value, offsets[0], options),
      body: new YulBlock(ast.body, offsets[1], options)
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return [
      `${this.caseKeyword} `,
      path.call(print, 'value'),
      ' ',
      path.call(print, 'body')
    ];
  }
}
