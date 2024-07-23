import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { SourceUnitMembers } from './SourceUnitMembers.js';

const { line } = doc.builders;

export class SourceUnit extends SlangNode {
  get kind() {
    return NonterminalKind.SourceUnit;
  }

  constructor(ast, offset, options) {
    super();

    const fetch = (offsets) => ({
      members: new SourceUnitMembers(ast.members, offsets[0], options)
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print, options) {
    return [path.call(print, 'members'), options.parentParser ? '' : line];
  }
}
