import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { TypeName } from './TypeName.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { PrintableNode } from './types.d.ts';

export class ArrayTypeName extends SlangNode {
  readonly kind = NonterminalKind.ArrayTypeName;

  operand: TypeName['variant'];

  index?: Expression['variant'];

  constructor(
    ast: ast.ArrayTypeName,
    collected: CollectedMetadata,
    options: ParserOptions<PrintableNode>
  ) {
    super(ast, collected);

    this.operand = extractVariant(
      new TypeName(ast.operand, collected, options)
    );
    if (ast.index) {
      this.index = extractVariant(
        new Expression(ast.index, collected, options)
      );
    }

    this.updateMetadata(this.operand, this.index);
  }

  print(print: PrintFunction): Doc {
    return [print('operand'), '[', print('index'), ']'];
  }
}
