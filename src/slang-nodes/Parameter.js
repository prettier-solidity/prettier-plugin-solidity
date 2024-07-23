import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { TypeName } from './TypeName.js';
import { StorageLocation } from './StorageLocation.js';

const { group } = doc.builders;

export class Parameter extends SlangNode {
  get kind() {
    return NonterminalKind.Parameter;
  }

  typeName;

  storageLocation;

  name;

  constructor(ast, offset, options) {
    super();

    const fetch = (offsets) => ({
      typeName: new TypeName(ast.typeName, offsets[0], options),
      storageLocation: ast.storageLocation
        ? new StorageLocation(ast.storageLocation, offsets[1], options)
        : undefined,
      name: ast.name?.text
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return group([
      path.call(print, 'typeName'),
      this.storageLocation ? ` ${path.call(print, 'storageLocation')}` : '',
      this.name ? ` ${this.name}` : ''
    ]);
  }
}
