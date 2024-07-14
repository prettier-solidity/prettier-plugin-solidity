import { SlangNode } from './SlangNode.js';

export class VersionPragma extends SlangNode {
  solidityKeyword;

  sets;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.initialize(ast, parse);
    this.finalize(ast);
  }

  print(path, print) {
    return [`${this.solidityKeyword} `, path.call(print, 'sets')];
  }
}
