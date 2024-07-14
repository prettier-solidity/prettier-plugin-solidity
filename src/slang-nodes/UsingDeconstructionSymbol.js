import { SlangNode } from './SlangNode.js';

export class UsingDeconstructionSymbol extends SlangNode {
  name;

  alias;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.name = parse(ast.name, this.nextChildOffset);
    if (ast.alias) {
      this.alias = parse(ast.alias, this.nextChildOffset);
    }
    this.initiateLoc(ast);
  }

  print(path, print) {
    return [
      path.call(print, 'name'),
      this.alias ? path.call(print, 'alias') : ''
    ];
  }
}
