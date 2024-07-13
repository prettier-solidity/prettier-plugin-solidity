import { SlangNode } from './SlangNode.js';

export class YulForStatement extends SlangNode {
  forKeyword;

  initialization;

  condition;

  iterator;

  body;

  constructor(ast, offset, parse, options) {
    super(ast, offset);
    this.forKeyword = ast.forKeyword.text;
    this.initialization = parse(
      ast.initialization,
      parse,
      this.nextChildOffset
    );
    this.condition = parse(ast.condition, parse, this.nextChildOffset);
    this.iterator = parse(ast.iterator, parse, this.nextChildOffset);
    this.body = parse(ast.body, parse, this.nextChildOffset);
    this.initiateLoc(ast);
  }

  print(path, print) {
    return [
      `${this.forKeyword} `,
      path.call(print, 'initialization'),
      ' ',
      path.call(print, 'condition'),
      ' ',
      path.call(print, 'iterator'),
      ' ',
      path.call(print, 'body')
    ];
  }
}
