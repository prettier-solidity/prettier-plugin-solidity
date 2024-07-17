import { doc } from 'prettier';
import { printSeparatedList } from '../common/printer-helpers.js';
import { SlangNode } from './SlangNode.js';
import { ForStatementInitialization } from './ForStatementInitialization.js';
import { ForStatementCondition } from './ForStatementCondition.js';
import { Expression } from './Expression.js';
import { Statement } from './Statement.js';

const { group, indent, line } = doc.builders;

export class ForStatement extends SlangNode {
  forKeyword;

  openParen;

  initialization;

  condition;

  iterator;

  closeParen;

  body;

  constructor(ast, offset, options) {
    super();

    const fetch = (childrenOffsets) => ({
      forKeyword: ast.forKeyword.text,
      openParen: ast.openParen.text,
      initialization: new ForStatementInitialization(
        ast.initialization,
        childrenOffsets.shift(),
        options
      ),
      condition: new ForStatementCondition(
        ast.condition,
        childrenOffsets.shift(),
        options
      ),
      iterator: ast.iterator
        ? new Expression(ast.iterator, childrenOffsets.shift(), options)
        : undefined,
      closeParen: ast.closeParen.text,
      body: new Statement(ast.body, childrenOffsets.shift(), options)
    });

    this.initialize(ast, offset, fetch);
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
