import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { MappingKey } from './MappingKey.js';
import { MappingValue } from './MappingValue.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class MappingType extends SlangNode {
  readonly kind = NonterminalKind.MappingType;

  keyType: MappingKey;

  valueType: MappingValue;

  constructor(ast: ast.MappingType, collected: CollectedMetadata) {
    super(ast, collected);

    this.keyType = new MappingKey(ast.keyType, collected);
    this.valueType = new MappingValue(ast.valueType, collected);

    this.updateMetadata(this.keyType, this.valueType);
  }

  print(print: PrintFunction): Doc {
    return ['mapping(', print('keyType'), ' => ', print('valueType'), ')'];
  }
}
