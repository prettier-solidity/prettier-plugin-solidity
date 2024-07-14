import { SlangNode } from './SlangNode.js';

export class ConstantDefinition extends SlangNode {
  typeName;

  constantKeyword;

  name;

  equal;

  value;

  semicolon;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.initialize(ast, parse);
    this.finalize(ast);
  }

  // TODO: implement print
  print(path, print, options) {
    return ['TODO: ConstantDefinition'];
  }
}
