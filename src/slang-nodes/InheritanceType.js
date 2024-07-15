import { SlangNode } from './SlangNode.js';

export class InheritanceType extends SlangNode {
  typeName;

  arguments;

  constructor(ast, offset, comments, parse) {
    super(ast, offset, comments);
    this.initialize(ast, parse);
    this.finalize(ast);
  }

  print(path, print) {
    return [
      path.call(print, 'typeName'),
      this.arguments ? path.call(print, 'arguments') : ''
    ];
  }
}
