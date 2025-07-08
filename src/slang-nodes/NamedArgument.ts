import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { Identifier } from './Identifier.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

export class NamedArgument extends SlangNode {
  readonly kind = NonterminalKind.NamedArgument;

  name: Identifier;

  value: Expression;

  constructor(ast: ast.NamedArgument, options: ParserOptions<AstNode>) {
    super(ast);

    this.name = new Identifier(ast.name);
    this.value = new Expression(ast.value, options);

    this.updateMetadata([this.value]);
  }

  print(path: AstPath<NamedArgument>, print: PrintFunction): Doc {
    return [path.call(print, 'name'), ': ', path.call(print, 'value')];
  }
}
