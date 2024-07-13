import { printFunction } from '../common/slang-helpers.js';
import { SlangNode } from './SlangNode.js';

export class FunctionType extends SlangNode {
  functionKeyword;

  parameters;

  attributes;

  returns;

  constructor({ ast, parse, offset, options }) {
    super(ast, offset);
    this.functionKeyword = ast.functionKeyword.text;
    this.parameters = parse(ast.parameters, parse, this.nextChildOffset);
    this.attributes = parse(ast.attributes, parse, this.nextChildOffset);
    this.returns = ast.returns
      ? parse(ast.returns, parse, this.nextChildOffset)
      : undefined;
    this.initiateLoc(ast);
  }

  print({ path, print }) {
    return printFunction(this.functionKeyword, this, path, print);
  }
}
