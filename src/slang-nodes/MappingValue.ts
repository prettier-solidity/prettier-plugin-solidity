import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { TypeName } from './TypeName.js';
import { TerminalNode } from './TerminalNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class MappingValue extends SlangNode {
  readonly kind = NonterminalKind.MappingValue;

  typeName: TypeName['variant'];

  name?: TerminalNode;

  constructor(ast: ast.MappingValue, collected: CollectedMetadata) {
    super(ast, collected);

    this.typeName = extractVariant(new TypeName(ast.typeName, collected));
    if (ast.name) {
      this.name = new TerminalNode(ast.name, collected);
    }

    this.updateMetadata(this.typeName);
  }

  print(print: PrintFunction): Doc {
    const nameDoc = print('name');
    return [print('typeName'), nameDoc ? [' ', nameDoc] : nameDoc];
  }
}
