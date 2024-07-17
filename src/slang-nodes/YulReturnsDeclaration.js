import { doc } from 'prettier';
import { printSeparatedItem } from '../common/printer-helpers.js';
import { SlangNode } from './SlangNode.js';
import { YulReturnVariables } from './YulReturnVariables.js';

const { line } = doc.builders;

export class YulReturnsDeclaration extends SlangNode {
  minusGreaterThan;

  variables;

  constructor(ast, offset, comments, parse, options) {
    super();

    const fetch = (childrenOffsets) => ({
      minusGreaterThan: ast.minusGreaterThan.text,
      variables: new YulReturnVariables(
        ast.variables,
        childrenOffsets.shift(),
        comments,
        parse,
        options
      )
    });

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print) {
    return printSeparatedItem(
      [this.minusGreaterThan, path.call(print, 'variables')],
      {
        firstSeparator: line
      }
    );
  }
}
