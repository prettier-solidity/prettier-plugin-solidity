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

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      tryKeyword: ast.tryKeyword.text,
      expression: new Expression(
        ast.expression,
        childrenOffsets.shift(),
        comments,
        options
      ),
      returns: ast.returns
        ? new ReturnsDeclaration(
            ast.returns,
            childrenOffsets.shift(),
            comments,
            options
          )
        : undefined,
      body: new Block(ast.body, childrenOffsets.shift(), comments, options),
      catchClauses: new CatchClauses(
        ast.catchClauses,
        childrenOffsets.shift(),
        comments,
        options
      )
    });

    this.initialize(ast, offset, fetch, comments);
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
