import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { TypeName } from './TypeName.js';
import { StorageLocation } from './StorageLocation.js';
import { TerminalNode } from './TerminalNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

const { group } = doc.builders;

export class Parameter extends SlangNode {
  readonly kind = NonterminalKind.Parameter;

  typeName: TypeName['variant'];

  storageLocation?: StorageLocation;

  name?: TerminalNode;

  constructor(ast: ast.Parameter, collected: CollectedMetadata) {
    super(ast, collected);

    this.typeName = extractVariant(new TypeName(ast.typeName, collected));
    if (ast.storageLocation) {
      this.storageLocation = new StorageLocation(
        ast.storageLocation,
        collected
      );
    }
    if (ast.name) {
      this.name = new TerminalNode(ast.name, collected);
    }

    this.updateMetadata(this.typeName, this.storageLocation);
  }

  print(print: PrintFunction): Doc {
    const storageLocationDoc = print('storageLocation');
    const nameDoc = print('name');
    return group([
      print('typeName'),
      storageLocationDoc ? [' ', storageLocationDoc] : storageLocationDoc,
      nameDoc ? [' ', nameDoc] : nameDoc
    ]);
  }
}
