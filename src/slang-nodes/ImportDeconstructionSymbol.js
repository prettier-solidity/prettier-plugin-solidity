import { SlangNode } from './SlangNode.js';

export class ImportDeconstructionSymbol extends SlangNode {
  name;

  alias;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.name = ast.name.text;
    this.alias = ast.alias ? parse(ast.alias, this.nextChildOffset) : undefined;
    this.initiateLoc(ast);
  }

  print(path, print) {
    return [this.name, this.alias ? path.call(print, 'alias') : ''];
  }
}
