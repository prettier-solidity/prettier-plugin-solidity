import { printFunction } from '../slang-printers/print-function.js';
import { SlangNode } from './SlangNode.js';

export class FunctionType extends SlangNode {
  functionKeyword;

  parameters;

  attributes;

  returns;

  constructor(ast, offset, comments, parse) {
    super(ast, offset, comments);
    this.initialize(ast, parse);
    this.finalize(ast);
  }

  print(path, print) {
    return printFunction(this.functionKeyword, this, path, print);
  }
}
