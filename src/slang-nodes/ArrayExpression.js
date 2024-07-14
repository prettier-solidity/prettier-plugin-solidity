import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';

const { group } = doc.builders;

export class ArrayExpression extends SlangNode {
  openBracket;

  items;

  closeBracket;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.openBracket = ast.openBracket.text;
    this.items = parse(ast.items, this.nextChildOffset);
    this.closeBracket = ast.closeBracket.text;
    this.initiateLoc(ast);
  }

  print(path, print) {
    return group([
      this.openBracket,
      path.call(print, 'items'),
      this.closeBracket
    ]);
  }
}
