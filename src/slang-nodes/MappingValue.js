import { SlangNode } from './SlangNode.js';

export class MappingValue extends SlangNode {
  typeName;

  name;

  constructor({ ast, parse, offset, options }) {
    super(ast, offset);
    this.typeName = parse(ast.typeName, parse, this.nextChildOffset);
    this.name = ast.name?.text;
    this.initiateLoc(ast);
  }

  print({ path, print }) {
    return [path.call(print, 'typeName'), this.name ? ` ${this.name}` : ''];
  }
}
