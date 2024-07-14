import { printFunction } from '../common/slang-helpers.js';
import { SlangNode } from './SlangNode.js';

export class ConstructorDefinition extends SlangNode {
  constructorKeyword;

  parameters;

  attributes;

  body;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.initialize(ast, parse);
    this.finalize(ast);
  }

  print(path, print) {
    return printFunction(this.constructorKeyword, this, path, print);
  }
}
