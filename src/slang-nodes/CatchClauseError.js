import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';

const { group } = doc.builders;

export class CatchClauseError extends SlangNode {
  name;

  parameters;

  constructor(ast, offset, parse, options) {
    super(ast, offset);
    this.name = ast.name?.text ?? '';
    this.parameters = parse(ast.parameters, parse, this.nextChildOffset);
    this.initiateLoc(ast);
  }

  print(path, print) {
    return [this.name, group(path.call(print, 'parameters')), ' '];
  }
}
