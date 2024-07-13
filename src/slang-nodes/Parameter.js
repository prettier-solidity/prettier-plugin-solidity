import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';

const { group } = doc.builders;

export class Parameter extends SlangNode {
  typeName;

  storageLocation;

  name;

  constructor({ ast, parse, offset, options }) {
    super(ast, offset);
    this.typeName = parse(ast.typeName, parse, this.nextChildOffset);
    this.storageLocation = ast.storageLocation
      ? parse(ast.storageLocation, parse, this.nextChildOffset)
      : undefined;
    this.name = ast.name?.text;
    this.initiateLoc(ast);
  }

  print({ path, print }) {
    return group([
      path.call(print, 'typeName'),
      this.storageLocation ? ` ${path.call(print, 'storageLocation')}` : '',
      this.name ? ` ${this.name}` : ''
    ]);
  }
}
