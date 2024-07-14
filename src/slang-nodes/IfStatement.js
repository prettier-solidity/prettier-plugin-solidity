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

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.parseChildrenNodes(ast, parse);
    this.initializeLoc(ast);
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
