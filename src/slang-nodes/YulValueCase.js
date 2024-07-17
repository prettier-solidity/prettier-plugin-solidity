import { SlangNode } from './SlangNode.js';
import { YulLiteral } from './YulLiteral.js';
import { YulBlock } from './YulBlock.js';

export class YulValueCase extends SlangNode {
  caseKeyword;

  value;

  body;

  constructor(ast, offset, comments, parse, options) {
    super();

    const fetch = (childrenOffsets) => ({
      caseKeyword: ast.caseKeyword.text,
      value: new YulLiteral(
        ast.value,
        childrenOffsets.shift(),
        comments,
        parse,
        options
      ),
      body: new YulBlock(
        ast.body,
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
      `${this.caseKeyword} `,
      path.call(print, 'value'),
      ' ',
      path.call(print, 'body')
    ];
  }
}
