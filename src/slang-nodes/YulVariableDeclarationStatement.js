import { SlangNode } from './SlangNode.js';
import { YulVariableDeclarationValue } from './YulVariableDeclarationValue.js';

export class YulVariableDeclarationStatement extends SlangNode {
  letKeyword;

  names;

  value;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      letKeyword: ast.letKeyword.text,
      names: ast.names.text,
      value: ast.value
        ? new YulVariableDeclarationValue(
            ast.value,
            childrenOffsets.shift(),
            comments,
            options
          )
        : undefined
    });

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print) {
    return [
      `${this.letKeyword} ${this.names} `,
      this.value ? path.call(print, 'value') : ''
    ];
  }
}
