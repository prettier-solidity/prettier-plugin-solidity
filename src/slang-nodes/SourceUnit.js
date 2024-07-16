import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';

const { line } = doc.builders;

export class SourceUnit extends SlangNode {
  members;

  constructor(ast, offset, comments, parse) {
    super();
    this.initialize(ast, offset, comments, parse);
  }

  print(path, print, options) {
    return [path.call(print, 'members'), options.parentParser ? '' : line];
  }
}
