import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { MappingKey } from './MappingKey.js';
import { MappingValue } from './MappingValue.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class MappingType implements SlangNode {
  readonly kind = NonterminalKind.MappingType;

  comments;

  loc;

  keyType: MappingKey;

  valueType: MappingValue;

  constructor(ast: ast.MappingType, options: ParserOptions<AstNode>) {
    let metadata = getNodeMetadata(ast);

    this.keyType = new MappingKey(ast.keyType);
    this.valueType = new MappingValue(ast.valueType, options);

    metadata = updateMetadata(metadata, [this.keyType, this.valueType]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<MappingType>, print: PrintFunction): Doc {
    return [
      'mapping(',
      path.call(print, 'keyType'),
      ' => ',
      path.call(print, 'valueType'),
      ')'
    ];
  }
}
