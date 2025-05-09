import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { TypeName } from './TypeName.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class NewExpression implements SlangNode {
  readonly kind = NonterminalKind.NewExpression;

  comments;

  loc;

  typeName: TypeName;

  constructor(ast: ast.NewExpression) {
    let metadata = getNodeMetadata(ast);

    this.typeName = new TypeName(ast.typeName);

    metadata = updateMetadata(metadata, [this.typeName]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<NewExpression>, print: PrintFunction): Doc {
    return ['new ', path.call(print, 'typeName')];
  }
}
