import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';

const { line } = doc.builders;

export class SourceUnit extends SlangNode {
  members;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.members = parse(ast.members, this.nextChildOffset);
    this.initiateLoc(ast);
  }

  print(path, print, options) {
    return [path.call(print, 'members'), options.parentParser ? '' : line];
  }
}
