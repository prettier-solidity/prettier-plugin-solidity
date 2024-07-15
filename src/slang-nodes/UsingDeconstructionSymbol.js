import { SlangNode } from './SlangNode.js';

export class UsingDeconstructionSymbol extends SlangNode {
  name;

  alias;

  constructor(ast, offset, comments, parse) {
    super(ast, offset, comments);
    this.initialize(ast, parse);
    this.finalize(ast);
  }

  print(path, print) {
    return [
      path.call(print, 'name'),
      this.alias ? path.call(print, 'alias') : ''
    ];
  }
}
