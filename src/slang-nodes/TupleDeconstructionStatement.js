import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';
import { TupleDeconstructionElements } from './TupleDeconstructionElements.js';
import { Expression } from './Expression.js';

const { group, indent, line } = doc.builders;

export class TupleDeconstructionStatement extends SlangNode {
  varKeyword;

  openParen;

  elements;

  closeParen;

  equal;

  expression;

  semicolon;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => {
      const {
        varKeyword,
        openParen,
        elements,
        closeParen,
        equal,
        expression,
        semicolon
      } = ast;
      this.varKeyword = varKeyword?.text;
      this.openParen = openParen.text;
      this.elements = new TupleDeconstructionElements(
        elements,
        childrenOffsets.shift(),
        comments,
        options
      );
      this.closeParen = closeParen.text;
      this.equal = equal.text;
      this.expression = new Expression(
        expression,
        childrenOffsets.shift(),
        comments,
        options
      );
      this.semicolon = semicolon.text;
    };

    this.initialize(ast, offset, fetch, comments);
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
