import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';

const { group, indent, line } = doc.builders;

export class TupleDeconstructionStatement extends SlangNode {
  varKeyword;

  openParen;

  elements;

  closeParen;

  equal;

  expression;

  semicolon;

  constructor(ast, offset, comments, parse) {
    super(ast, offset, comments);
    this.initialize(ast, parse);
    this.finalize(ast);
  }

  print(path, print) {
    return [
      this.varKeyword ? this.varKeyword : '',
      this.openParen,
      path.call(print, 'elements'),
      this.expression.variant.kind === 'TupleExpression'
        ? [`${this.closeParen} ${this.equal} `, path.call(print, 'expression')]
        : group([
            `${this.closeParen} ${this.equal}`,
            indent([line, path.call(print, 'expression'), this.semicolon])
          ])
    ];
  }
}
