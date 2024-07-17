import { SlangNode } from './SlangNode.js';
import { MappingKeyType } from './MappingKeyType.js';

export class MappingKey extends SlangNode {
  keyType;

  name;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { keyType, name } = ast;
      this.keyType = new MappingKeyType(
        keyType,
        childrenOffsets.shift(),
        comments,
        options
      );
      this.name = name?.text;
    };

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print) {
    return [path.call(print, 'keyType'), this.name ? ` ${this.name}` : ''];
  }
}
