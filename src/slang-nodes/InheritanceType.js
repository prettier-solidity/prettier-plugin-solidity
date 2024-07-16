import { SlangNode } from './SlangNode.js';

export class InheritanceType extends SlangNode {
  typeName;

  arguments;

  constructor(ast, offset, comments, parse) {
    super();
    this.initialize(ast, offset, comments, parse);
  }

  print(path, print) {
    return [
      path.call(print, 'typeName'),
      this.arguments ? path.call(print, 'arguments') : ''
    ];
  }
}
