import { printPreservingEmptyLines } from '../common/slang-helpers.js';
import { SlangNode } from './SlangNode.js';
import { SourceUnitMember } from './SourceUnitMember.js';

export class SourceUnitMembers extends SlangNode {
  items;

  constructor(ast, offset, parse, options) {
    super(ast, offset);
    this.items = ast.items.map(
      (item) => new SourceUnitMember(item, this.nextChildOffset, parse, options)
    );
    this.initiateLoc(ast);
  }

  print({ path, options, print }) {
    return printPreservingEmptyLines(path, 'items', options, print);
  }
}
