import { printFunction } from '../common/slang-helpers.js';
import { SlangNode } from './SlangNode.js';

export class FallbackFunctionDefinition extends SlangNode {
  fallbackKeyword;

  parameters;

  attributes;

  returns;

  body;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.fallbackKeyword = ast.fallbackKeyword.text;
    this.parameters = parse(ast.parameters, parse, this.nextChildOffset);
    this.attributes = parse(ast.attributes, parse, this.nextChildOffset);
    this.returns = ast.returns
      ? parse(ast.returns, parse, this.nextChildOffset)
      : undefined;
    this.body = parse(ast.body, parse, this.nextChildOffset);
    this.initiateLoc(ast);
  }

  print(path, print) {
    return printFunction(this.fallbackKeyword, this, path, print);
  }
}
