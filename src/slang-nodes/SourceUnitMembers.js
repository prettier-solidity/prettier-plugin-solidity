import { printPreservingEmptyLines } from '../slang-printers/print-preserving-empty-lines.js';
import { SlangNode } from './SlangNode.js';

export class SourceUnitMembers extends SlangNode {
  items;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.initialize(ast, parse);
    this.finalize(ast);
  }

  print(path, print, options) {
    return printPreservingEmptyLines(path, 'items', options, print);
  }
}
