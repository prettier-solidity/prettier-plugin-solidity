import { doc } from 'prettier';
import { printSeparatedItem } from '../common/printer-helpers.js';
import { SlangNode } from './SlangNode.js';

const { line } = doc.builders;

export class YulReturnsDeclaration extends SlangNode {
  minusGreaterThan;

  variables;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.minusGreaterThan = ast.minusGreaterThan.text;
    this.variables = parse(ast.variables, parse, this.nextChildOffset);
    this.initiateLoc(ast);
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
