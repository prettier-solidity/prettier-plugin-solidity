import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { joinExisting } from '../slang-utils/join-existing.js';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { MappingKeyType } from './MappingKeyType.js';
import { TerminalNode } from './TerminalNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction } from '../types.d.ts';

export class MappingKey extends SlangNode {
  readonly kind = NonterminalKind.MappingKey;

  keyType: MappingKeyType['variant'];

  name?: TerminalNode;

  constructor(ast: ast.MappingKey) {
    super(ast);

    this.keyType = extractVariant(new MappingKeyType(ast.keyType));
    if (ast.name) {
      this.name = new TerminalNode(ast.name);
    }

    this.updateMetadata(this.keyType);
  }

  print(path: AstPath<MappingKey>, print: PrintFunction): Doc {
    return joinExisting(' ', [
      path.call(print, 'keyType'),
      path.call(print, 'name')
    ]);
  }
}
