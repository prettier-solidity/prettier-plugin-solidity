import { SlangNode } from './SlangNode.js';
import { StorageLocation } from './StorageLocation.js';

export class UntypedTupleMember extends SlangNode {
  storageLocation;

  name;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
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

  // TODO: implement print
  print(path, print, options) {
    return ['TODO: UntypedTupleMemberUntypedTupleMember'];
  }
}
