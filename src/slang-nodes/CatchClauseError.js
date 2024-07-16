import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';

const { group } = doc.builders;

export class CatchClauseError extends SlangNode {
  name;

  parameters;

  constructor(ast, offset, comments, parse) {
    super();
    this.initialize(ast, offset, comments, parse);
  }

  print(path, print) {
    return [`${this.name ?? ''}`, group(path.call(print, 'parameters')), ' '];
  }
}
