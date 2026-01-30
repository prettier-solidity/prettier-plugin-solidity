import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { joinExisting } from '../slang-utils/join-existing.js';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { TypeName } from './TypeName.js';
import { StorageLocation } from './StorageLocation.js';
import { TerminalNode } from './TerminalNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class TypedTupleMember extends SlangNode {
  readonly kind = NonterminalKind.TypedTupleMember;

  typeName: TypeName['variant'];

  storageLocation?: StorageLocation;

  name: TerminalNode;

  constructor(
    ast: ast.TypedTupleMember,
    collected: CollectedMetadata,
    options: ParserOptions<AstNode>
  ) {
    super(ast, collected);

    this.typeName = extractVariant(
      new TypeName(ast.typeName, collected, options)
    );
    if (ast.storageLocation) {
      this.storageLocation = new StorageLocation(
        ast.storageLocation,
        collected
      );
    }
    this.name = new TerminalNode(ast.name, collected);

    this.updateMetadata(this.typeName, this.storageLocation);
  }

  print(path: AstPath<TypedTupleMember>, print: PrintFunction): Doc {
    return joinExisting(' ', [
      path.call(print, 'typeName'),
      path.call(print, 'storageLocation'),
      path.call(print, 'name')
    ]);
  }
}
