import { doc } from 'prettier';
import { printSeparatedItem } from '../common/printer-helpers.js';
import { SlangNode } from './SlangNode.js';

const { group, hardline, indent, line } = doc.builders;

const printBody = (bodyVariantKind, path, print) =>
  bodyVariantKind === 'Block'
    ? [' ', path.call(print, 'body')]
    : group(indent([line, path.call(print, 'body')]), {
        shouldBreak: bodyVariantKind === 'IfStatement' // `if` within `if`
      });

export class IfStatement extends SlangNode {
  ifKeyword;

  openParen;

  condition;

  closeParen;

  body;

  elseBranch;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.ifKeyword = ast.ifKeyword.text;
    this.openParen = ast.openParen.text;
    this.condition = parse(ast.condition, parse, this.nextChildOffset);
    this.closeParen = ast.closeParen.text;
    this.body = parse(ast.body, parse, this.nextChildOffset);
    this.elseBranch = ast.elseBranch
      ? parse(ast.elseBranch, parse, this.nextChildOffset)
      : undefined;
    this.initiateLoc(ast);
  }

  print(path, print) {
    const bodyVariantKind = this.body.variant.kind;

    return [
      `${this.ifKeyword} ${this.openParen}`,
      printSeparatedItem(path.call(print, 'condition')),
      this.closeParen,
      printBody(bodyVariantKind, path, print),
      this.elseBranch
        ? [
            bodyVariantKind !== 'Block'
              ? hardline // else on a new line if body is not a block
              : ' ',
            path.call(print, 'elseBranch')
          ]
        : ''
    ];
  }
}
