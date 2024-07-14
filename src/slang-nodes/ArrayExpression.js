import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';

const { group } = doc.builders;

export class ArrayExpression extends SlangNode {
  openBracket;

  items;

  closeBracket;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.parseChildrenNodes(ast, parse);
    this.initializeLoc(ast);
  }

  print(path, print) {
    return group([
      this.openBracket,
      path.call(print, 'items'),
      this.closeBracket
    ]);
  }
}
