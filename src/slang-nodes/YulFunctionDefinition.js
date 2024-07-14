import { SlangNode } from './SlangNode.js';

export class YulFunctionDefinition extends SlangNode {
  functionKeyword;

  name;

  parameters;

  returns;

  body;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.functionKeyword = ast.functionKeyword.text;
    this.name = ast.name.text;
    this.parameters = parse(ast.parameters, this.nextChildOffset);
    this.returns = ast.returns
      ? parse(ast.returns, this.nextChildOffset)
      : undefined;
    this.body = parse(ast.body, this.nextChildOffset);
    this.initiateLoc(ast);
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
