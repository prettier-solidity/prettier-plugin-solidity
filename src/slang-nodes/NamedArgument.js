import { SlangNode } from './SlangNode.js';

export class NamedArgument extends SlangNode {
  name;

  colon;

  value;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.name = ast.name.text;
    this.colon = ast.colon.text;
    this.value = parse(ast.value, this.nextChildOffset);
    this.initiateLoc(ast);
  }

  print(path, print) {
    return [`${this.name}${this.colon} `, path.call(print, 'value')];
  }
}
