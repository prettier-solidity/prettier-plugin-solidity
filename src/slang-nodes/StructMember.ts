import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { TypeName } from './TypeName.js';
import { Identifier } from './Identifier.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

export class StructMember extends SlangNode {
  readonly kind = NonterminalKind.StructMember;

  typeName: TypeName;

  name: Identifier;

  constructor(ast: ast.StructMember, options: ParserOptions<AstNode>) {
    super(ast);

    this.typeName = new TypeName(ast.typeName, options);
    this.name = new Identifier(ast.name);

    this.updateMetadata([this.typeName]);
  }

  print(path: AstPath<StructMember>, print: PrintFunction): Doc {
    return [path.call(print, 'typeName'), ' ', path.call(print, 'name'), ';'];
  }
}
