import { printFunction } from '../common/slang-helpers.js';
import { SlangNode } from './SlangNode.js';

export class ConstructorDefinition extends SlangNode {
  constructorKeyword;

  parameters;

  attributes;

  body;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.initializeChildrenKeys();
    this.parseChildrenNodes(ast, parse);
    this.initializeLoc(ast);
  }

  print(path, print) {
    return printFunction(this.constructorKeyword, this, path, print);
  }
}
