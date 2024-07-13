import { SlangNode } from './SlangNode.js';

export class VersionPragma extends SlangNode {
  solidityKeyword;

  sets;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.solidityKeyword = ast.solidityKeyword.text;
    this.sets = parse(ast.sets, parse, this.nextChildOffset);
    this.initiateLoc(ast);
  }

  print(path, print) {
    return [`${this.solidityKeyword} `, path.call(print, 'sets')];
  }
}
