import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';

const { group } = doc.builders;

export class ReturnsDeclaration extends SlangNode {
  returnsKeyword;

  variables;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.returnsKeyword = ast.returnsKeyword.text;
    this.variables = parse(ast.variables, parse, this.nextChildOffset);
    this.initiateLoc(ast);
  }

  print(path, print) {
    return [`${this.returnsKeyword} `, group(path.call(print, 'variables'))];
  }
}
