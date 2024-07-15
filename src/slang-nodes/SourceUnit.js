import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';

const { line } = doc.builders;

export class SourceUnit extends SlangNode {
  members;

  constructor(ast, offset, comments, parse) {
    super(ast, offset, comments);
    this.initialize(ast, parse);
    this.finalize(ast);
  }

  print(path, print, options) {
    return [path.call(print, 'members'), options.parentParser ? '' : line];
  }
}
