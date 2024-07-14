import { SlangNode } from './SlangNode.js';

export class MappingType extends SlangNode {
  mappingKeyword;

  openParen;

  keyType;

  equalGreaterThan;

  valueType;

  closeParen;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.mappingKeyword = ast.mappingKeyword.text;
    this.openParen = ast.openParen.text;
    this.keyType = parse(ast.keyType, this.nextChildOffset);
    this.equalGreaterThan = ast.equalGreaterThan.text;
    this.valueType = parse(ast.valueType, this.nextChildOffset);
    this.closeParen = ast.closeParen.text;
    this.initiateLoc(ast);
  }

  print(path, print) {
    return [
      `${this.mappingKeyword}${this.openParen}`,
      path.call(print, 'keyType'),
      ` ${this.equalGreaterThan} `,
      path.call(print, 'valueType'),
      this.closeParen
    ];
  }
}
