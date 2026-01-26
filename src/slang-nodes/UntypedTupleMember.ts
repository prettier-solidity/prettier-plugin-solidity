import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { joinExisting } from '../slang-utils/join-existing.js';
import { SlangNode } from './SlangNode.js';
import { StorageLocation } from './StorageLocation.js';
import { TerminalNode } from './TerminalNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.ts';

export class UntypedTupleMember extends SlangNode {
  readonly kind = NonterminalKind.UntypedTupleMember;

  storageLocation?: StorageLocation;

  name: TerminalNode;

  constructor(ast: ast.UntypedTupleMember, options: ParserOptions<AstNode>) {
    super(ast, options);

    if (ast.storageLocation) {
      this.storageLocation = new StorageLocation(ast.storageLocation, options);
    }
    this.name = new TerminalNode(ast.name, options);

    this.updateMetadata(this.storageLocation);
  }

  print(path: AstPath<UntypedTupleMember>, print: PrintFunction): Doc {
    return joinExisting(' ', [
      path.call(print, 'storageLocation'),
      path.call(print, 'name')
    ]);
  }
}
