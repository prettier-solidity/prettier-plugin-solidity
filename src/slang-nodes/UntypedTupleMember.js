import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { StorageLocation } from './StorageLocation.js';

export class UntypedTupleMember extends SlangNode {
  get kind() {
    return NonterminalKind.UntypedTupleMember;
  }

  storageLocation;

  name;

  constructor(ast, offset, options) {
    super();

    const fetch = (offsets) => ({
      storageLocation: ast.storageLocation
        ? new StorageLocation(ast.storageLocation, offsets[0], options)
        : undefined,
      name: ast.name.text
    });

    this.initialize(ast, offset, fetch);
  }

  // TODO: implement print
  print(path, print, options) {
    return ['TODO: UntypedTupleMemberUntypedTupleMember'];
  }
}
