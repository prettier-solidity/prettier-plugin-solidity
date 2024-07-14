import { SlangNode } from './SlangNode.js';

export class UntypedTupleMember extends SlangNode {
  storageLocation;

  name;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    if (ast.storageLocation) {
      this.storageLocation = parse(ast.storageLocation, this.nextChildOffset);
    }
    this.name = ast.name.text;
    this.initiateLoc(ast);
  }

  // TODO: implement print
  print(path, print, options) {
    return ['TODO: UntypedTupleMemberUntypedTupleMember'];
  }
}
