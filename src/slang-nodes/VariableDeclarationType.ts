import {
  NonterminalKind,
  TerminalNode as SlangTerminalNode
} from '@nomicfoundation/slang/cst';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { TypeName } from './TypeName.js';
import { TerminalNode } from './TerminalNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';

export class VariableDeclarationType extends SlangNode {
  readonly kind = NonterminalKind.VariableDeclarationType;

  variant: TypeName['variant'] | TerminalNode;

  constructor(
    ast: ast.VariableDeclarationType,
    options: ParserOptions<AstNode>
  ) {
    super(ast);

    const variant = ast.variant;
    if (variant instanceof SlangTerminalNode) {
      this.variant = new TerminalNode(variant);
      return;
    }
    this.variant = extractVariant(new TypeName(variant, options));

    this.updateMetadata(this.variant);
  }
}
