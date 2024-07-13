import { printFunction } from '../common/slang-helpers.js';
import { SlangNode } from './SlangNode.js';

export class ConstructorDefinition extends SlangNode {
  constructorKeyword;

  parameters;

  attributes;

  body;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.constructorKeyword = ast.constructorKeyword.text;
    this.parameters = parse(ast.parameters, parse, this.nextChildOffset);
    this.attributes = parse(ast.attributes, parse, this.nextChildOffset);
    this.body = parse(ast.body, parse, this.nextChildOffset);
    this.initiateLoc(ast);
  }

  print(path, print) {
    return printFunction(this.constructorKeyword, this, path, print);
  }
}
