import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';

const { group } = doc.builders;

export class Parameter extends SlangNode {
  typeName;

  storageLocation;

  name;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.parseChildrenNodes(ast, parse);
    this.initializeLoc(ast);
  }

  print(path, print) {
    return group([
      path.call(print, 'typeName'),
      this.storageLocation ? ` ${path.call(print, 'storageLocation')}` : '',
      this.name ? ` ${this.name}` : ''
    ]);
  }
}
