import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { TypeName } from './TypeName.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { PrintableNode } from './types.d.ts';

export class NewExpression extends SlangNode {
  readonly kind = NonterminalKind.NewExpression;

  typeName: TypeName['variant'];

  constructor(
    ast: ast.NewExpression,
    collected: CollectedMetadata,
    options: ParserOptions<PrintableNode>
  ) {
    super(ast, collected);

    this.typeName = extractVariant(
      new TypeName(ast.typeName, collected, options)
    );

    this.updateMetadata(this.typeName);
  }

  print(print: PrintFunction): Doc {
    return ['new ', print('typeName')];
  }
}
