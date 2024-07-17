import { SlangNode } from './SlangNode.js';
import { TypeName } from './TypeName.js';

export class EventParameter extends SlangNode {
  typeName;

  indexedKeyword;

  name;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { typeName, indexedKeyword, name } = ast;
      this.typeName = new TypeName(
        typeName,
        childrenOffsets.shift(),
        comments,
        options
      );
      this.indexedKeyword = indexedKeyword?.text;
      this.name = name?.text;
    };

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
