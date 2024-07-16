import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';

const { group } = doc.builders;

export class ReturnsDeclaration extends SlangNode {
  returnsKeyword;

  variables;

  constructor(ast, offset, comments, parse) {
    super();
    this.initialize(ast, offset, comments, parse);
  }

  print(path, print) {
    return [`${this.returnsKeyword} `, group(path.call(print, 'variables'))];
  }
}
