import { SlangNode } from './SlangNode.js';

export class UntypedTupleMember extends SlangNode {
  storageLocation;

  name;

  constructor(ast, offset, comments, parse) {
    super();
    this.initialize(ast, offset, comments, parse);
  }

  // TODO: implement print
  print(path, print, options) {
    return ['TODO: UntypedTupleMemberUntypedTupleMember'];
  }
}
