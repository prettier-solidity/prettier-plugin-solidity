import { printFunction } from '../common/slang-helpers.js';
import { SlangNode } from './SlangNode.js';

export class UnnamedFunctionDefinition extends SlangNode {
  functionKeyword;

  parameters;

  attributes;

  body;

  constructor({ ast, parse, offset, options }) {
    super(ast, offset);
    this.functionKeyword = ast.functionKeyword.text;
    this.parameters = parse(ast.parameters, parse, this.nextChildOffset);
    this.attributes = parse(ast.attributes, parse, this.nextChildOffset);
    this.body = parse(ast.body, parse, this.nextChildOffset);
    this.initiateLoc(ast);
  }

  print({ path, print }) {
    return printFunction(this.functionKeyword, this, path, print);
  }
}
