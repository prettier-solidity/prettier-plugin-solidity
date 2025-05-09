import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { Identifier } from './Identifier.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class NamedArgument implements SlangNode {
  readonly kind = NonterminalKind.NamedArgument;

  comments;

  loc;

  name: Identifier;

  value: Expression;

  constructor(ast: ast.NamedArgument) {
    let metadata = getNodeMetadata(ast);

    this.name = new Identifier(ast.name);
    this.value = new Expression(ast.value);

    metadata = updateMetadata(metadata, [this.value]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<NamedArgument>, print: PrintFunction): Doc {
    return [path.call(print, 'name'), ': ', path.call(print, 'value')];
  }
}
