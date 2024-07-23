import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { YulVariableDeclarationValue } from './YulVariableDeclarationValue.js';

export class YulVariableDeclarationStatement extends SlangNode {
  get kind() {
    return NonterminalKind.YulVariableDeclarationStatement;
  }

  letKeyword;

  names;

  value;

  constructor(ast, offset, options) {
    super();

    const fetch = (offsets) => ({
      letKeyword: ast.letKeyword.text,
      names: ast.names.text,
      value: ast.value
        ? new YulVariableDeclarationValue(ast.value, offsets[0], options)
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
