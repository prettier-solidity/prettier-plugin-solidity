import { SlangNode } from './SlangNode.js';

export class InheritanceType extends SlangNode {
  typeName;

  arguments;

  constructor(ast, offset, parse, options) {
    super(ast, offset);
    this.typeName = parse(ast.typeName, parse, this.nextChildOffset);
    this.arguments = ast.arguments
      ? parse(ast.arguments, parse, this.nextChildOffset)
      : undefined;
    this.initiateLoc(ast);
  }

  print({ path, print }) {
    return [
      path.call(print, 'typeName'),
      this.arguments ? path.call(print, 'arguments') : ''
    ];
  }
}
