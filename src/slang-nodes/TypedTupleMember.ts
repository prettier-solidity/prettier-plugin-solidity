import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { extractVariant } from '../slang-utils/extract-variant.ts';
import { SlangNode } from './SlangNode.ts';
import { TypeName } from './TypeName.ts';
import { StorageLocation } from './StorageLocation.ts';
import { TerminalNode } from './TerminalNode.ts';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class TypedTupleMember extends SlangNode {
  readonly kind = NonterminalKind.TypedTupleMember;

  typeName: TypeName['variant'];

  storageLocation?: StorageLocation;

  name: TerminalNode;

  constructor(ast: ast.TypedTupleMember, collected: CollectedMetadata) {
    super(ast, collected);

    this.typeName = extractVariant(new TypeName(ast.typeName, collected));
    if (ast.storageLocation) {
      this.storageLocation = new StorageLocation(
        ast.storageLocation,
        collected
      );
    }
    this.name = new TerminalNode(ast.name, collected);

    this.updateMetadata(this.typeName, this.storageLocation);
  }

  print(print: PrintFunction): Doc {
    const storageLocationDoc = print('storageLocation');
    return [
      print('typeName'),
      storageLocationDoc ? [' ', storageLocationDoc] : storageLocationDoc,
      ' ',
      print('name')
    ];
  }
}
