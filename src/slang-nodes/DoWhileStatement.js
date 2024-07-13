import { doc } from 'prettier';
import { printSeparatedItem } from '../common/printer-helpers.js';
import { SlangNode } from './SlangNode.js';

const { group, indent, line } = doc.builders;

const printBody = (node, path, print) =>
  node.body.variant.kind === 'Block'
    ? [' ', path.call(print, 'body'), ' ']
    : group([indent([line, path.call(print, 'body')]), line]);

export class DoWhileStatement extends SlangNode {
  doKeyword;

  body;

  whileKeyword;

  openParen;

  condition;

  closeParen;

  semicolon;

  constructor(ast, offset, parse, options) {
    super(ast, offset);
    this.doKeyword = ast.doKeyword.text;
    this.body = parse(ast.body, parse, this.nextChildOffset);
    this.whileKeyword = ast.whileKeyword.text;
    this.openParen = ast.openParen.text;
    this.condition = parse(ast.condition, parse, this.nextChildOffset);
    this.closeParen = ast.closeParen.text;
    this.semicolon = ast.semicolon.text;
    this.initiateLoc(ast);
  }

  print({ path, print }) {
    return [
      this.doKeyword,
      printBody(this, path, print),
      `${this.whileKeyword} ${this.openParen}`,
      printSeparatedItem(path.call(print, 'condition')),
      `${this.closeParen}${this.semicolon}`
    ];
  }
}
