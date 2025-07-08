import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { TypeName } from './TypeName.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class NewExpression implements SlangNode {
  readonly kind = NonterminalKind.NewExpression;

  comments;

  loc;

  typeName: TypeName;

  constructor(ast: ast.NewExpression, options: ParserOptions<AstNode>) {
    const metadata = getNodeMetadata(ast);

    this.typeName = new TypeName(ast.typeName, options);

    [this.loc, this.comments] = updateMetadata(metadata, [this.typeName]);
  }

  print(path: AstPath<NewExpression>, print: PrintFunction): Doc {
    return ['new ', path.call(print, 'typeName')];
  }
}
