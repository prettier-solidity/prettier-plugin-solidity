import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';
import { ParametersDeclaration } from './ParametersDeclaration.js';

const { group } = doc.builders;

export class CatchClauseError extends SlangNode {
  name;

  parameters;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      name: ast.name?.text,
      parameters: new ParametersDeclaration(
        ast.parameters,
        childrenOffsets.shift(),
        comments,
        options
      )
    });

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print) {
    return [`${this.name ?? ''}`, group(path.call(print, 'parameters')), ' '];
  }
}
