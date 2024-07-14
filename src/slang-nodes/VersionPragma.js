import { SlangNode } from './SlangNode.js';

export class VersionPragma extends SlangNode {
  solidityKeyword;

  sets;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.initializeChildrenKeys();
    this.parseChildrenNodes(ast, parse);
    this.initializeLoc(ast);
  }

  print(path, print) {
    return [`${this.solidityKeyword} `, path.call(print, 'sets')];
  }
}
