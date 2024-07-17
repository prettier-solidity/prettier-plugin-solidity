import { SlangNode } from './SlangNode.js';
import { TypeName } from './TypeName.js';

export class MappingValue extends SlangNode {
  typeName;

  name;

  constructor(ast, offset, comments, parse, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { typeName, name } = ast;
      this.typeName = new TypeName(
        typeName,
        childrenOffsets.shift(),
        comments,
        parse,
        options
      );
      this.name = name?.text;
    };

    this.initialize(ast, offset, comments, fetch, parse);
  }

  print(path, print) {
    return [path.call(print, 'typeName'), this.name ? ` ${this.name}` : ''];
  }
}
