import { SlangNode } from './SlangNode.js';

export class UsingDeconstructionSymbol extends SlangNode {
  name;

  alias;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.name = parse(ast.name, this.nextChildOffset);
    this.alias = ast.alias ? parse(ast.alias, this.nextChildOffset) : undefined;
    this.initiateLoc(ast);
  }

  print(path, print) {
    return [
      path.call(print, 'name'),
      this.alias ? path.call(print, 'alias') : ''
    ];
  }
}
