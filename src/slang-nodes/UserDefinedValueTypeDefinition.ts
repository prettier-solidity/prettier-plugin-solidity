import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { Identifier } from './Identifier.js';
import { ElementaryType } from './ElementaryType.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class UserDefinedValueTypeDefinition implements SlangNode {
  readonly kind = NonterminalKind.UserDefinedValueTypeDefinition;

  comments;

  loc;

  name: Identifier;

  valueType: ElementaryType;

  constructor(ast: ast.UserDefinedValueTypeDefinition) {
    const metadata = getNodeMetadata(ast);

    this.name = new Identifier(ast.name);
    this.valueType = new ElementaryType(ast.valueType);

    [this.loc, this.comments] = updateMetadata(metadata, [this.valueType]);
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
