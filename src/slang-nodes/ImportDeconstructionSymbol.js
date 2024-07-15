import { SlangNode } from './SlangNode.js';

export class ImportDeconstructionSymbol extends SlangNode {
  name;

  alias;

  constructor(ast, offset, comments, parse) {
    super(ast, offset, comments);
    this.initialize(ast, parse);
    this.finalize(ast);
  }

  print(path, print) {
    return [this.name, this.alias ? path.call(print, 'alias') : ''];
  }
}
