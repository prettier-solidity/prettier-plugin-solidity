import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { TupleDeconstructionElements } from './TupleDeconstructionElements.js';
import { Expression } from './Expression.js';

const { group, indent, line } = doc.builders;

export class TupleDeconstructionStatement extends SlangNode {
  get kind() {
    return NonterminalKind.TupleDeconstructionStatement;
  }

  varKeyword;

  openParen;

  elements;

  closeParen;

  equal;

  expression;

  semicolon;

  constructor(ast, offset, options) {
    super();

    const fetch = (offsets) => ({
      varKeyword: ast.varKeyword?.text,
      openParen: ast.openParen.text,
      elements: new TupleDeconstructionElements(
        ast.elements,
        offsets[0],
        options
      ),
      closeParen: ast.closeParen.text,
      equal: ast.equal.text,
      expression: new Expression(ast.expression, offsets[1], options),
      semicolon: ast.semicolon.text
    });

    this.initialize(ast, offset, fetch);
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
