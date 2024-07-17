import { SlangNode } from './SlangNode.js';
import { YulVariableDeclarationValue } from './YulVariableDeclarationValue.js';

export class YulVariableDeclarationStatement extends SlangNode {
  letKeyword;

  names;

  value;

  constructor(ast, offset, comments, parse, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { letKeyword, names, value } = ast;
      this.letKeyword = letKeyword.text;
      this.names = names.text;
      if (value) {
        this.value = new YulVariableDeclarationValue(
          value,
          childrenOffsets.shift(),
          comments,
          parse,
          options
        );
      }
    };

    this.initialize(ast, offset, comments, fetch, parse);
  }

  print(path, print) {
    return [
      `${this.letKeyword} ${this.names} `,
      this.value ? path.call(print, 'value') : ''
    ];
  }
}
