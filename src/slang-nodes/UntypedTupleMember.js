import { SlangNode } from './SlangNode.js';
import { StorageLocation } from './StorageLocation.js';

export class UntypedTupleMember extends SlangNode {
  storageLocation;

  name;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { storageLocation, name } = ast;

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

  // TODO: implement print
  print(path, print, options) {
    return ['TODO: UntypedTupleMemberUntypedTupleMember'];
  }
}
