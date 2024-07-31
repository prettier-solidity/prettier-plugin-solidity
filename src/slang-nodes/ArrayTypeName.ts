import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { TypeName } from './TypeName.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { SlangNode } from '../types.js';

export class ArrayTypeName implements SlangNode {
  readonly kind = NonterminalKind.ArrayTypeName;

  comments;

  loc;

  operand: TypeName;

  openBracket: string;

  index?: Expression;

  closeBracket: string;

  constructor(ast: ast.ArrayTypeName, offset: number, options: ParserOptions) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.operand = new TypeName(ast.operand, offsets[0], options);
    this.openBracket = ast.openBracket.text;
    if (ast.index) {
      this.index = new Expression(ast.index, offsets[1], options);
    }
    this.closeBracket = ast.closeBracket.text;

    metadata = updateMetadata(metadata, [this.operand, this.index]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath, print: (path: AstPath) => Doc): Doc {
    return [
      path.call(print, 'operand'),
      this.openBracket,
      this.index ? path.call(print, 'index') : '',
      this.closeBracket
    ];
  }
}
