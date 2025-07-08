import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { Identifier } from './Identifier.js';
import { ElementaryType } from './ElementaryType.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction } from '../types.d.ts';

export class UserDefinedValueTypeDefinition extends SlangNode {
  readonly kind = NonterminalKind.UserDefinedValueTypeDefinition;

  name: Identifier;

  valueType: ElementaryType;

  constructor(ast: ast.UserDefinedValueTypeDefinition) {
    super(ast);

    this.name = new Identifier(ast.name);
    this.valueType = new ElementaryType(ast.valueType);

    this.updateMetadata([this.valueType]);
  }

  print(
    path: AstPath<UserDefinedValueTypeDefinition>,
    print: PrintFunction
  ): Doc {
    return [
      'type ',
      path.call(print, 'name'),
      ' is ',
      path.call(print, 'valueType'),
      ';'
    ];
  }
}
