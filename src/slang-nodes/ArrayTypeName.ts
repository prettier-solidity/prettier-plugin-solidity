import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { TypeName } from './TypeName.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class ArrayTypeName implements SlangNode {
  readonly kind = NonterminalKind.ArrayTypeName;

  comments;

  loc;

  operand: TypeName;

  index?: Expression;

  constructor(ast: ast.ArrayTypeName, options: ParserOptions<AstNode>) {
    const metadata = getNodeMetadata(ast);

    this.operand = new TypeName(ast.operand, options);
    if (ast.index) {
      this.index = new Expression(ast.index, options);
    }

    [this.loc, this.comments] = updateMetadata(metadata, [
      this.operand,
      this.index
    ]);
  }

  print(path: AstPath<ArrayTypeName>, print: PrintFunction): Doc {
    return [path.call(print, 'operand'), '[', path.call(print, 'index'), ']'];
  }
}
