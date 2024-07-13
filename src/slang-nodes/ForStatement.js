import { doc } from 'prettier';
import { printSeparatedList } from '../common/printer-helpers.js';
import { SlangNode } from './SlangNode.js';

const { group, indent, line } = doc.builders;

export class ForStatement extends SlangNode {
  forKeyword;

  openParen;

  initialization;

  condition;

  iterator;

  closeParen;

  body;

  constructor(ast, offset, parse, options) {
    super(ast, offset);
    this.forKeyword = ast.forKeyword.text;
    this.openParen = ast.openParen.text;
    this.initialization = parse(
      ast.initialization,
      parse,
      this.nextChildOffset
    );
    this.condition = parse(ast.condition, parse, this.nextChildOffset);
    this.iterator = ast.iterator
      ? parse(ast.iterator, parse, this.nextChildOffset)
      : undefined;
    this.closeParen = ast.closeParen.text;
    this.body = parse(ast.body, parse, this.nextChildOffset);
    this.initiateLoc(ast);
  }

  print(path, print) {
    const initialization = path.call(print, 'initialization');
    const condition = path.call(print, 'condition');
    const iterator = this.iterator ? path.call(print, 'iterator') : '';

    return [
      `${this.forKeyword} ${this.openParen}`,
      printSeparatedList([initialization, condition, iterator], {
        separator:
          initialization !== ';' || condition !== ';' || iterator !== ''
            ? line
            : ''
      }),
      this.closeParen,
      this.body.variant.kind === 'Block'
        ? [' ', path.call(print, 'body')]
        : group(indent([line, path.call(print, 'body')]))
    ];
  }
}
