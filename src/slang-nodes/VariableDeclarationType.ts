import { NonterminalKind, TerminalNode } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { TypeName } from './TypeName.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class VariableDeclarationType implements SlangNode {
  readonly kind = NonterminalKind.VariableDeclarationType;

  comments;

  loc;

  variant: TypeName | string;

  constructor(ast: ast.VariableDeclarationType) {
    let metadata = getNodeMetadata(ast);

    this.variant =
      ast.variant instanceof TerminalNode
        ? ast.variant.unparse()
        : new TypeName(ast.variant);

    metadata = updateMetadata(
      metadata,
      typeof this.variant === 'string' ? [] : [this.variant]
    );

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<VariableDeclarationType>, print: PrintFunction): Doc {
    return typeof this.variant === 'string'
      ? this.variant
      : path.call(print, 'variant');
  }
}
