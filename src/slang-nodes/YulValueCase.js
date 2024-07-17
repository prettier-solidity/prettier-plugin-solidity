import { SlangNode } from './SlangNode.js';
import { YulLiteral } from './YulLiteral.js';
import { YulBlock } from './YulBlock.js';

export class YulValueCase extends SlangNode {
  caseKeyword;

  value;

  body;

  constructor(ast, offset, comments, parse, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { caseKeyword, value, body } = ast;
      this.caseKeyword = caseKeyword.text;
      this.value = new YulLiteral(
        value,
        childrenOffsets.shift(),
        comments,
        parse,
        options
      );
      this.body = new YulBlock(
        body,
        childrenOffsets.shift(),
        comments,
        parse,
        options
      );
    };

    this.initialize(ast, offset, comments, fetch, parse);
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
