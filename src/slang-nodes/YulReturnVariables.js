import { doc } from 'prettier';
import { printSeparatedList } from '../common/printer-helpers.js';
import { SlangNode } from './SlangNode.js';

const { line } = doc.builders;

export class YulReturnVariables extends SlangNode {
  items;

  separators;

  constructor(ast, offset, comments) {
    super();

    const fetch = () => ({
      items: ast.items.map((item) => item.text),
      separators: ast.separators.map((separator) => separator.text)
    });

    this.initialize(ast, offset, fetch, comments);
  }

  print() {
    return printSeparatedList(this.items, {
      firstSeparator: line,
      lastSeparator: ''
    });
  }
}
