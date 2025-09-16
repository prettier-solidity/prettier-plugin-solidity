import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printVariant } from '../slang-printers/print-variant.js';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { TypeName } from './TypeName.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class ArrayTypeName extends SlangNode {
  readonly kind = NonterminalKind.ArrayTypeName;

  operand: TypeName;

  index?: Expression['variant'];

  constructor(ast: ast.ArrayTypeName, options: ParserOptions<AstNode>) {
    super(ast);

    this.operand = new TypeName(ast.operand, options);
    if (ast.index) {
      this.index = extractVariant(new Expression(ast.index, options));
    }

    this.updateMetadata(this.operand, this.index);
  }

  print(path: AstPath<ArrayTypeName>, print: PrintFunction): Doc {
    return [
      path.call(printVariant(print), 'operand'),
      '[',
      path.call(print, 'index'),
      ']'
    ];
  }
}
