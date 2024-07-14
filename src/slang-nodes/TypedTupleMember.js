import { SlangNode } from './SlangNode.js';

export class TypedTupleMember extends SlangNode {
  typeName;

  storageLocation;

  name;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.typeName = parse(ast.typeName, this.nextChildOffset);
    if (ast.storageLocation) {
      this.storageLocation = parse(ast.storageLocation, this.nextChildOffset);
    }
    this.name = ast.name.text;
    this.initiateLoc(ast);
  }

  print(path, print) {
    return [
      path.call(print, 'typeName'),
      this.storageLocation ? [' ', path.call(print, 'storageLocation')] : '',
      ` ${this.name}`
    ];
  }
}
