import { doc } from 'prettier';
import { printSeparatedList } from '../common/printer-helpers.js';
import { SlangNode } from './SlangNode.js';

const { line } = doc.builders;

export class YulReturnVariables extends SlangNode {
  items;

  separators;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.parseChildrenNodes(ast, parse);
    this.initializeLoc(ast);
  }

  print() {
    return printSeparatedList(this.items, {
      firstSeparator: line,
      lastSeparator: ''
    });
  }
}
