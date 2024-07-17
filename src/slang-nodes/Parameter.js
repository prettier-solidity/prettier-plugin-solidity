import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';
import { TypeName } from './TypeName.js';
import { StorageLocation } from './StorageLocation.js';

const { group } = doc.builders;

export class Parameter extends SlangNode {
  typeName;

  storageLocation;

  name;

  constructor(ast, offset, options) {
    super();

    const fetch = (childrenOffsets) => ({
      typeName: new TypeName(ast.typeName, childrenOffsets.shift(), options),
      storageLocation: ast.storageLocation
        ? new StorageLocation(
            ast.storageLocation,
            childrenOffsets.shift(),
            options
          )
        : undefined,
      name: ast.name?.text
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return group([
      path.call(print, 'typeName'),
      this.storageLocation ? ` ${path.call(print, 'storageLocation')}` : '',
      this.name ? ` ${this.name}` : ''
    ]);
  }
}
