import { SlangNode } from './SlangNode.js';

export class ImportDeconstructionSymbol extends SlangNode {
  name;

  alias;

  constructor(ast, offset, comments, parse) {
    super();
    this.initialize(ast, offset, comments, parse);
  }

  print(path, print) {
    return [this.name, this.alias ? path.call(print, 'alias') : ''];
  }
}
