import { SlangNode } from './SlangNode.js';

export class YulFunctionDefinition extends SlangNode {
  functionKeyword;

  name;

  parameters;

  returns;

  body;

  constructor(ast, offset, comments, parse) {
    super(ast, offset, comments);
    this.initialize(ast, parse);
    this.finalize(ast);
  }

  print(path, print) {
    return [
      `${this.functionKeyword} ${this.name}`,
      path.call(print, 'parameters'),
      this.returns ? path.call(print, 'returns') : ' ',
      path.call(print, 'body')
    ];
  }
}
