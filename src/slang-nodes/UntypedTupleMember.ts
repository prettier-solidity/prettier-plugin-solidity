import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { joinExisting } from '../slang-utils/join-existing.js';
import { SlangNode } from './SlangNode.js';
import { StorageLocation } from './StorageLocation.js';
import { TerminalNode } from './TerminalNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction } from '../types.d.ts';

export class UntypedTupleMember extends SlangNode {
  readonly kind = NonterminalKind.UntypedTupleMember;

  storageLocation?: StorageLocation;

  name: TerminalNode;

  constructor(ast: ast.UntypedTupleMember) {
    super(ast);

    if (ast.storageLocation) {
      this.storageLocation = new StorageLocation(ast.storageLocation);
    }
    this.name = new TerminalNode(ast.name);

    this.updateMetadata(this.storageLocation);
  }

  print(path: AstPath<UntypedTupleMember>, print: PrintFunction): Doc {
    return joinExisting(' ', [
      path.call(print, 'storageLocation'),
      path.call(print, 'name')
    ]);
  }
}
