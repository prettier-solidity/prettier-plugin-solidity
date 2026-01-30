import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { NamedArguments } from './NamedArguments.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class NamedArgumentGroup extends SlangNode {
  readonly kind = NonterminalKind.NamedArgumentGroup;

  arguments: NamedArguments;

  constructor(
    ast: ast.NamedArgumentGroup,
    collected: CollectedMetadata,
    options: ParserOptions<AstNode>
  ) {
    super(ast, collected);

    this.arguments = new NamedArguments(ast.arguments, collected, options);

    this.updateMetadata(this.arguments);
  }

  print(path: AstPath<NamedArgumentGroup>, print: PrintFunction): Doc {
    return ['{', path.call(print, 'arguments'), '}'];
  }
}
