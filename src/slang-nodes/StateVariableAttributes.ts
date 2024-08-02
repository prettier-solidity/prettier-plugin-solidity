import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { StateVariableAttribute } from './StateVariableAttribute.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { AstNode, SlangNode } from '../types';

export class StateVariableAttributes implements SlangNode {
  readonly kind = NonterminalKind.StateVariableAttributes;

  comments;

  loc;

  items: StateVariableAttribute[];

  constructor(ast: ast.StateVariableAttributes, offset: number) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.items = ast.items.map(
      (item, index) => new StateVariableAttribute(item, offsets[index])
    );

    metadata = updateMetadata(metadata, [this.items]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(
    path: AstPath<StateVariableAttributes>,
    print: (path: AstPath<AstNode>) => Doc
  ): Doc {
    return this.items.length
      ? path.map(print, 'items').map((item) => [' ', item])
      : '';
  }
}
