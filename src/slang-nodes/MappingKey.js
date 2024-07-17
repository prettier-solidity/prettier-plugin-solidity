import { SlangNode } from './SlangNode.js';
import { MappingKeyType } from './MappingKeyType.js';

export class MappingKey extends SlangNode {
  keyType;

  name;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      keyType: new MappingKeyType(
        ast.keyType,
        childrenOffsets.shift(),
        comments,
        options
      ),
      name: ast.name?.text
    });

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print) {
    return [path.call(print, 'keyType'), this.name ? ` ${this.name}` : ''];
  }
}
