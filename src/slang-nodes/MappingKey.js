import { SlangNode } from './SlangNode.js';

export class MappingKey extends SlangNode {
  keyType;

  name;

  constructor(ast, offset, parse, options) {
    super(ast, offset);
    this.keyType = parse(ast.keyType, parse, this.nextChildOffset);
    this.name = ast.name?.text;
    this.initiateLoc(ast);
  }

  print(path, print) {
    return [path.call(print, 'keyType'), this.name ? ` ${this.name}` : ''];
  }
}
