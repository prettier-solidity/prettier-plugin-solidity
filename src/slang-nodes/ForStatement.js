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

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => {
      const {
        forKeyword,
        openParen,
        initialization,
        condition,
        iterator,
        closeParen,
        body
      } = ast;
      this.forKeyword = forKeyword.text;
      this.openParen = openParen.text;
      this.initialization = new ForStatementInitialization(
        initialization,
        childrenOffsets.shift(),
        comments,
        options
      );
      this.condition = new ForStatementCondition(
        condition,
        childrenOffsets.shift(),
        comments,
        options
      );
      if (iterator) {
        this.iterator = new Expression(
          iterator,
          childrenOffsets.shift(),
          comments,
          options
        );
      }
      this.closeParen = closeParen.text;
      this.body = new Statement(
        body,
        childrenOffsets.shift(),
        comments,
        options
      );
    };

    this.initialize(ast, offset, comments, fetch);
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
