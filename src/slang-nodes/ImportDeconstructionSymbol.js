import { SlangNode } from './SlangNode.js';

export class ImportDeconstructionSymbol extends SlangNode {
  name;

  alias;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.name = ast.name.text;
    if (ast.alias) {
      this.alias = parse(ast.alias, this.nextChildOffset);
    }
    this.initiateLoc(ast);
  }

  print(path, print) {
    return [this.name, this.alias ? path.call(print, 'alias') : ''];
  }
}
