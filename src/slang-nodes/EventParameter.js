import { SlangNode } from './SlangNode.js';

export class EventParameter extends SlangNode {
  typeName;

  indexedKeyword;

  name;

  constructor(ast, offset, comments, parse) {
    super();
    this.initialize(ast, offset, comments, parse);
  }

  print(path, print) {
    return [
      path.call(print, 'typeName'),
      this.indexedKeyword ? ` ${this.indexedKeyword}` : '',
      this.name ? ` ${this.name}` : ''
    ];
  }
}
