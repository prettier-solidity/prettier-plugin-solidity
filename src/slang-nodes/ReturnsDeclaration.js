import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';

const { group } = doc.builders;

export class ReturnsDeclaration extends SlangNode {
  returnsKeyword;

  variables;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.initializeChildrenKeys();
    this.parseChildrenNodes(ast, parse);
    this.initializeLoc(ast);
  }

  print(path, print) {
    return [`${this.returnsKeyword} `, group(path.call(print, 'variables'))];
  }
}
