import { SlangNode } from './SlangNode.js';
import { TypeName } from './TypeName.js';
import { StorageLocation } from './StorageLocation.js';

export class TypedTupleMember extends SlangNode {
  typeName;

  storageLocation;

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
      storageLocation: ast.storageLocation
        ? new StorageLocation(
            ast.storageLocation,
            childrenOffsets.shift(),
            comments,
            options
          )
        : undefined,
      name: ast.name.text
    });

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print) {
    return [
      path.call(print, 'typeName'),
      this.storageLocation ? [' ', path.call(print, 'storageLocation')] : '',
      ` ${this.name}`
    ];
  }
}
