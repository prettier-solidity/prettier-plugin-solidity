import { SlangNode } from './SlangNode.js';
import { TypeName } from './TypeName.js';
import { StorageLocation } from './StorageLocation.js';

export class TypedTupleMember extends SlangNode {
  typeName;

  storageLocation;

  name;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { typeName, storageLocation, name } = ast;
      this.typeName = new TypeName(
        typeName,
        childrenOffsets.shift(),
        comments,
        options
      );
      if (storageLocation) {
        this.storageLocation = new StorageLocation(
          storageLocation,
          childrenOffsets.shift(),
          comments,
          options
        );
      }
      this.name = name.text;
    };

    this.initialize(ast, offset, comments, fetch);
  }

  print(path, print) {
    return [
      path.call(print, 'typeName'),
      this.storageLocation ? [' ', path.call(print, 'storageLocation')] : '',
      ` ${this.name}`
    ];
  }
}
