import { doc } from 'prettier';
import { printSeparatedItem } from '../common/printer-helpers.js';
import { SlangNode } from './SlangNode.js';

const { group, indent, line } = doc.builders;

const body = (node, path, print) =>
  node.body.variant.kind === 'Block'
    ? [' ', path.call(print, 'body')]
    : group(indent([line, path.call(print, 'body')]));

export class WhileStatement extends SlangNode {
  whileKeyword;

  openParen;

  condition;

  closeParen;

  body;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.initializeChildrenKeys();
    this.parseChildrenNodes(ast, parse);
    this.initializeLoc(ast);
  }

  print(path, print) {
    return [
      `${this.whileKeyword} ${this.openParen}`,
      printSeparatedItem(path.call(print, 'condition')),
      this.closeParen,
      body(this, path, print)
    ];
  }
}
