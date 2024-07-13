import { SlangNode } from './SlangNode.js';

export class OverridePathsDeclaration extends SlangNode {
  openParen;

  paths;

  closeParen;

  constructor({ ast, parse, offset, options }) {
    super(ast, offset);
    this.openParen = ast.openParen.text;
    this.paths = parse(ast.paths, parse, this.nextChildOffset);
    this.closeParen = ast.closeParen.text;
    this.initiateLoc(ast);
  }

  // TODO: implement print
  print({ path, print, options }) {
    return ['TODO: OverridePathsDeclaration'];
  }
}
