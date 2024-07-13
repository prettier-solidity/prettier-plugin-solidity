import { SlangNode } from './SlangNode.js';

export class EventParameter extends SlangNode {
  typeName;

  indexedKeyword;

  name;

  constructor(ast, offset, parse, options) {
    super(ast, offset);
    this.typeName = parse(ast.typeName, parse, this.nextChildOffset);
    this.indexedKeyword = ast.indexedKeyword?.text;
    this.name = ast.name?.text;
    this.initiateLoc(ast);
  }

  print(path, print) {
    return [
      path.call(print, 'typeName'),
      this.indexedKeyword ? ` ${this.indexedKeyword}` : '',
      this.name ? ` ${this.name}` : ''
    ];
  }
}
