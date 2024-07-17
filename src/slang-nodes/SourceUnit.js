import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';
import { SourceUnitMembers } from './SourceUnitMembers.js';

const { line } = doc.builders;

export class SourceUnit extends SlangNode {
  members;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      members: new SourceUnitMembers(
        ast.members,
        childrenOffsets.shift(),
        comments,
        options
      )
    });

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print, options) {
    return [path.call(print, 'members'), options.parentParser ? '' : line];
  }
}
