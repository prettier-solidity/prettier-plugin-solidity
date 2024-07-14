import { printFunction } from '../common/slang-helpers.js';
import { SlangNode } from './SlangNode.js';

export class FunctionType extends SlangNode {
  functionKeyword;

  parameters;

  attributes;

  returns;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.functionKeyword = ast.functionKeyword.text;
    this.parameters = parse(ast.parameters, this.nextChildOffset);
    this.attributes = parse(ast.attributes, this.nextChildOffset);
    if (ast.returns) {
      this.returns = parse(ast.returns, this.nextChildOffset);
    }
    this.initiateLoc(ast);
  }

  print(path, print) {
    return printFunction(this.functionKeyword, this, path, print);
  }
}
