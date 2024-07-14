import { SlangNode } from './SlangNode.js';

export class UntypedTupleMember extends SlangNode {
  storageLocation;

  name;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.initialize(ast, parse);
    this.finalize(ast);
  }

  // TODO: implement print
  print(path, print, options) {
    return ['TODO: UntypedTupleMemberUntypedTupleMember'];
  }
}
