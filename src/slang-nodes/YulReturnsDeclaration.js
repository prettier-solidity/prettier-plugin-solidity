import { doc } from 'prettier';
import { printSeparatedItem } from '../common/printer-helpers.js';
import { SlangNode } from './SlangNode.js';
import { YulReturnVariables } from './YulReturnVariables.js';

const { line } = doc.builders;

export class YulReturnsDeclaration extends SlangNode {
  minusGreaterThan;

  variables;

  constructor(ast, offset, options) {
    super();

    const fetch = (childrenOffsets) => ({
      minusGreaterThan: ast.minusGreaterThan.text,
      variables: new YulReturnVariables(
        ast.variables,
        childrenOffsets.shift(),
        options
      )
    });

    this.initialize(ast, offset, fetch);
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
