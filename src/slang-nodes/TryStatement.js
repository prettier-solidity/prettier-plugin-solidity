import { doc } from 'prettier';
import { printSeparatedItem } from '../common/printer-helpers.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';
import { ReturnsDeclaration } from './ReturnsDeclaration.js';
import { Block } from './Block.js';
import { CatchClauses } from './CatchClauses.js';

const { line } = doc.builders;

export class TryStatement extends SlangNode {
  tryKeyword;

  expression;

  returns;

  body;

  catchClauses;

  constructor(ast, offset, options) {
    super();

    const fetch = (childrenOffsets) => ({
      tryKeyword: ast.tryKeyword.text,
      expression: new Expression(
        ast.expression,
        childrenOffsets.shift(),
        options
      ),
      returns: ast.returns
        ? new ReturnsDeclaration(ast.returns, childrenOffsets.shift(), options)
        : undefined,
      body: new Block(ast.body, childrenOffsets.shift(), options),
      catchClauses: new CatchClauses(
        ast.catchClauses,
        childrenOffsets.shift(),
        options
      )
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return [
      this.tryKeyword,
      printSeparatedItem(path.call(print, 'expression'), {
        firstSeparator: line
      }),
      this.returns ? [path.call(print, 'returns'), ' '] : '',
      path.call(print, 'body'),
      ' ',
      path.call(print, 'catchClauses')
    ];
  }
}
