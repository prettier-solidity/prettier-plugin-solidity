import { printFunction } from '../slang-printers/print-function.js';
import { SlangNode } from './SlangNode.js';

export class ConstructorDefinition extends SlangNode {
  constructorKeyword;

  parameters;

  attributes;

  body;

  constructor(ast, offset, comments, parse) {
    super();
    this.initialize(ast, offset, comments, parse);
  }

  print(path, print) {
    return printFunction(this.constructorKeyword, this, path, print);
  }
}
