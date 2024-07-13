import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';
import { SourceUnitMembers } from './SourceUnitMembers.js';

const { line } = doc.builders;

export class SourceUnit extends SlangNode {
  members;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.members = new SourceUnitMembers(
      ast.members,
      this.nextChildOffset,
      options,
      parse
    );
    this.initiateLoc(ast);
  }

  print(path, print, options) {
    return [path.call(print, 'members'), options.parentParser ? '' : line];
  }
}
