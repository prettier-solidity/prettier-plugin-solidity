import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { group } from '../slang-printers/prettier-builders.ts';
import { extractVariant } from '../slang-utils/extract-variant.ts';
import { SlangNode } from './SlangNode.ts';
import { TypeName } from './TypeName.ts';
import { StorageLocation } from './StorageLocation.ts';
import { TerminalNode } from './TerminalNode.ts';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

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
