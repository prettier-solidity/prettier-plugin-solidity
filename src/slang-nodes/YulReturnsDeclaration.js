import { doc } from 'prettier';
import { printSeparatedItem } from '../common/printer-helpers.js';
import { SlangNode } from './SlangNode.js';

const { line } = doc.builders;

export class YulReturnsDeclaration extends SlangNode {
  minusGreaterThan;

  variables;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.initializeChildrenKeys();
    this.parseChildrenNodes(ast, parse);
    this.initializeLoc(ast);
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
