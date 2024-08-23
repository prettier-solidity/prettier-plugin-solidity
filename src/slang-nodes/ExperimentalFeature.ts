import {
  NonterminalKind,
  TerminalKind
} from '@nomicfoundation/slang/kinds/index.js';
import { TerminalNode } from '@nomicfoundation/slang/cst/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { StringLiteral } from './StringLiteral.js';
import { Identifier } from './Identifier.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from '../slang-nodes';
import type { PrintFunction, SlangNode } from '../types';

export class ExperimentalFeature implements SlangNode {
  readonly kind = NonterminalKind.ExperimentalFeature;

  comments;

  loc;

  variant: StringLiteral | Identifier;

  constructor(ast: ast.ExperimentalFeature, options: ParserOptions<AstNode>) {
    let metadata = getNodeMetadata(ast);

    this.variant =
      ast.variant instanceof TerminalNode
        ? new Identifier(ast.variant)
        : new StringLiteral(ast.variant, options);

    metadata = updateMetadata(
      metadata,
      this.variant.kind === TerminalKind.Identifier ? [] : [this.variant]
    );

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<ExperimentalFeature>, print: PrintFunction): Doc {
    return path.call(print, 'variant');
  }
}
