import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';
import { SourceUnitMembers } from './SourceUnitMembers.js';

const { line } = doc.builders;

export class SourceUnit extends SlangNode {
  members;

  constructor(ast, offset, parse, options) {
    super(ast, offset);
    this.members = new SourceUnitMembers(
      ast.members,
      this.nextChildOffset,
      parse,
      options
    );
    this.initiateLoc(ast);
  }

  print({ options, path, print }) {
    return [path.call(print, 'members'), options.parentParser ? '' : line];
  }
}
