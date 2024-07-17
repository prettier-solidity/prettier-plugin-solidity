import { SlangNode } from './SlangNode.js';
import { YulVariableDeclarationValue } from './YulVariableDeclarationValue.js';

export class YulVariableDeclarationStatement extends SlangNode {
  letKeyword;

  names;

  value;

  constructor(ast, offset, options) {
    super();

    const fetch = (childrenOffsets) => ({
      letKeyword: ast.letKeyword.text,
      names: ast.names.text,
      value: ast.value
        ? new YulVariableDeclarationValue(
            ast.value,
            childrenOffsets.shift(),
            options
          )
        : undefined
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return [
      `${this.letKeyword} ${this.names} `,
      this.value ? path.call(print, 'value') : ''
    ];
  }
}
