import {
  NonterminalKind,
  TerminalKind,
  TerminalNode
} from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { StringLiteral } from './StringLiteral.js';
import { Identifier } from './Identifier.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

export class ExperimentalFeature extends SlangNode {
  readonly kind = NonterminalKind.ExperimentalFeature;

  variant: StringLiteral | Identifier;

  constructor(ast: ast.ExperimentalFeature, options: ParserOptions<AstNode>) {
    super(ast);

    this.variant =
      ast.variant instanceof TerminalNode
        ? new Identifier(ast.variant)
        : new StringLiteral(ast.variant, options);

    this.updateMetadata(
      this.variant.kind === TerminalKind.Identifier ? [] : [this.variant]
    );
  }

  print(path: AstPath<ExperimentalFeature>, print: PrintFunction): Doc {
    return path.call(print, 'variant');
  }
}
