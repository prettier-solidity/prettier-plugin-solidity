const { NonterminalKind } = await import('@nomicfoundation/slang/cst');
import { joinExisting } from '../slang-utils/join-existing.js';
import { SlangNode } from './SlangNode.js';
import { TypeName } from './TypeName.js';
import { Identifier } from './Identifier.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

export class EventParameter extends SlangNode {
  readonly kind = NonterminalKind.EventParameter;

  typeName: TypeName;

  indexedKeyword?: string;

  name?: Identifier;

  constructor(ast: ast.EventParameter, options: ParserOptions<AstNode>) {
    super(ast);

    this.typeName = new TypeName(ast.typeName, options);
    this.indexedKeyword = ast.indexedKeyword?.unparse();
    if (ast.name) {
      this.name = new Identifier(ast.name);
    }

    this.updateMetadata(this.typeName);
  }

  print(path: AstPath<EventParameter>, print: PrintFunction): Doc {
    return joinExisting(' ', [
      path.call(print, 'typeName'),
      this.indexedKeyword,
      path.call(print, 'name')
    ]);
  }
}
