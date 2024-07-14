import { SlangNode } from './SlangNode.js';

export class InheritanceType extends SlangNode {
  typeName;

  arguments;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.typeName = parse(ast.typeName, this.nextChildOffset);
    if (ast.arguments) {
      this.arguments = parse(ast.arguments, this.nextChildOffset);
    }
    this.initiateLoc(ast);
  }

  print(path, print) {
    return [
      path.call(print, 'typeName'),
      this.arguments ? path.call(print, 'arguments') : ''
    ];
  }
}
