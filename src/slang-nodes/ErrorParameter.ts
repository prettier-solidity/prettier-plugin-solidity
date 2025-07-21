import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { joinExisting } from '../slang-utils/join-existing.js';
import { SlangNode } from './SlangNode.js';
import { TypeName } from './TypeName.js';
import { Identifier } from './Identifier.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

export class ErrorParameter extends SlangNode {
  readonly kind = NonterminalKind.ErrorParameter;

  typeName: TypeName;

  name?: Identifier;

  constructor(ast: ast.ErrorParameter, options: ParserOptions<AstNode>) {
    super(ast);

    this.typeName = new TypeName(ast.typeName, options);
    if (ast.name) {
      this.name = new Identifier(ast.name);
    }

    this.updateMetadata(this.typeName);
  }

  print(path: AstPath<ErrorParameter>, print: PrintFunction): Doc {
    return joinExisting(' ', [
      path.call(print, 'typeName'),
      path.call(print, 'name')
    ]);
  }
}
