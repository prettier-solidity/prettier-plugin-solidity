import { printPreservingEmptyLines } from '../common/slang-helpers.js';
import { SlangNode } from './SlangNode.js';
import { SourceUnitMember } from './SourceUnitMember.js';

export class SourceUnitMembers extends SlangNode {
  items;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.items = ast.items.map(
      (item) => new SourceUnitMember(item, this.nextChildOffset, options, parse)
    );
    this.initiateLoc(ast);
  }

  print(path, print, options) {
    return printPreservingEmptyLines(path, 'items', options, print);
  }
}
