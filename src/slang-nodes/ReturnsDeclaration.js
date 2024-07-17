import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';
import { ParametersDeclaration } from './ParametersDeclaration.js';

const { group } = doc.builders;

export class ReturnsDeclaration extends SlangNode {
  returnsKeyword;

  variables;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      returnsKeyword: ast.returnsKeyword.text,
      variables: new ParametersDeclaration(
        ast.variables,
        childrenOffsets.shift(),
        comments,
        options
      )
    });

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print) {
    return [`${this.returnsKeyword} `, group(path.call(print, 'variables'))];
  }
}
