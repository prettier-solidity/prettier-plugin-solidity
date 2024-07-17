import { printPreservingEmptyLines } from '../slang-printers/print-preserving-empty-lines.js';
import { SlangNode } from './SlangNode.js';
import { SourceUnitMember } from './SourceUnitMember.js';

export class SourceUnitMembers extends SlangNode {
  items;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      items: ast.items.map(
        (item) =>
          new SourceUnitMember(item, childrenOffsets.shift(), comments, options)
      )
    });

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print, options) {
    return printPreservingEmptyLines(path, 'items', options, print);
  }
}
