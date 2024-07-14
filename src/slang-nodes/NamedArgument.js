import { SlangNode } from './SlangNode.js';

export class NamedArgument extends SlangNode {
  name;

  colon;

  value;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.parseChildrenNodes(ast, parse);
    this.initializeLoc(ast);
  }

  print(path, print) {
    return [`${this.name}${this.colon} `, path.call(print, 'value')];
  }
}
