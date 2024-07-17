import { SlangNode } from './SlangNode.js';
import { TypeName } from './TypeName.js';

export class EventParameter extends SlangNode {
  typeName;

  indexedKeyword;

  name;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      typeName: new TypeName(
        ast.typeName,
        childrenOffsets.shift(),
        comments,
        options
      ),
      indexedKeyword: ast.indexedKeyword?.text,
      name: ast.name?.text
    });

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print) {
    return [
      path.call(print, 'typeName'),
      this.indexedKeyword ? ` ${this.indexedKeyword}` : '',
      this.name ? ` ${this.name}` : ''
    ];
  }
}
