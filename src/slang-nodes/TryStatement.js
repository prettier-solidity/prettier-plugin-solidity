import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { printSeparatedItem } from '../common/printer-helpers.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';
import { ReturnsDeclaration } from './ReturnsDeclaration.js';
import { Block } from './Block.js';
import { CatchClauses } from './CatchClauses.js';

const { line } = doc.builders;

export class TryStatement extends SlangNode {
  get kind() {
    return NonterminalKind.TryStatement;
  }

  tryKeyword;

  expression;

  returns;

  body;

  catchClauses;

  constructor(ast, offset, options) {
    super();

    const fetch = (offsets) => {
      let i = 0;
      const children = {
        tryKeyword: ast.tryKeyword.text,
        expression: new Expression(ast.expression, offsets[0], options),
        returns: ast.returns
          ? new ReturnsDeclaration(ast.returns, offsets[(i += 1)], options)
          : undefined,
        body: new Block(ast.body, offsets[(i += 1)], options),
        catchClauses: new CatchClauses(
          ast.catchClauses,
          offsets[(i += 1)],
          options
        )
      };
      return children;
    };

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
