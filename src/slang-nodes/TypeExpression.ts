import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { extractVariant } from '../slang-utils/extract-variant.ts';
import { SlangNode } from './SlangNode.ts';
import { TypeName } from './TypeName.ts';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class TypeExpression extends SlangNode {
  readonly kind = NonterminalKind.TypeExpression;

  typeName: TypeName['variant'];

  constructor(ast: ast.TypeExpression, collected: CollectedMetadata) {
    super(ast, collected);

    this.typeName = extractVariant(new TypeName(ast.typeName, collected));

    this.updateMetadata(this.typeName);
  }

  print(print: PrintFunction): Doc {
    return ['type(', print('typeName'), ')'];
  }
}
