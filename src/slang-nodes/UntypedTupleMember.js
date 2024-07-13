import { SlangNode } from './SlangNode.js';

export class UntypedTupleMember extends SlangNode {
  storageLocation;

  name;

  constructor(ast, offset, parse, options) {
    super(ast, offset);
    this.storageLocation = ast.storageLocation
      ? parse(ast.storageLocation, parse, this.nextChildOffset)
      : undefined;
    this.name = ast.name.text;
    this.initiateLoc(ast);
  }

  // TODO: implement print
  print(path, print, options) {
    return ['TODO: UntypedTupleMemberUntypedTupleMember'];
  }
}
