import { SlangNode } from './SlangNode.js';

export class NamedArgument extends SlangNode {
  name;

  colon;

  value;

  constructor({ ast, parse, offset, options }) {
    super(ast, offset);
    this.name = ast.name.text;
    this.colon = ast.colon.text;
    this.value = parse(ast.value, parse, this.nextChildOffset);
    this.initiateLoc(ast);
  }

  print({ path, print }) {
    return [`${this.name}${this.colon} `, path.call(print, 'value')];
  }
}
