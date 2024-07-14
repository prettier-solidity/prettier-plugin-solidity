import { SlangNode } from './SlangNode.js';

export class InheritanceSpecifier extends SlangNode {
  isKeyword;

  types;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.isKeyword = ast.isKeyword.text;
    this.types = parse(ast.types, this.nextChildOffset);
    this.initiateLoc(ast);
  }

  print(path, print) {
    return [this.isKeyword, path.call(print, 'types')];
  }
}
