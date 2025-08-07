import * as ast from '@nomicfoundation/slang/ast';
import {
  NonterminalKind,
  TerminalNode as SlangTerminalNode
} from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { ModifierInvocation } from './ModifierInvocation.js';
import { OverrideSpecifier } from './OverrideSpecifier.js';
import { TerminalNode } from './TerminalNode.js';

import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

function createNonterminalVariant(
  variant: Exclude<ast.FunctionAttribute['variant'], SlangTerminalNode>,
  options: ParserOptions<AstNode>
): Exclude<FunctionAttribute['variant'], TerminalNode> {
  if (variant instanceof ast.ModifierInvocation) {
    return new ModifierInvocation(variant, options);
  }
  if (variant instanceof ast.OverrideSpecifier) {
    return new OverrideSpecifier(variant);
  }
  const exhaustiveCheck: never = variant;
  return exhaustiveCheck;
}

export class FunctionAttribute extends SlangNode {
  readonly kind = NonterminalKind.FunctionAttribute;

  variant: ModifierInvocation | OverrideSpecifier | TerminalNode;

  constructor(ast: ast.FunctionAttribute, options: ParserOptions<AstNode>) {
    super(ast);

    const variant = ast.variant;
    if (variant instanceof SlangTerminalNode) {
      this.variant = new TerminalNode(variant);
      return;
    }
    this.variant = createNonterminalVariant(variant, options);

    this.updateMetadata(this.variant);
  }

  print(path: AstPath<FunctionAttribute>, print: PrintFunction): Doc {
    return path.call(print, 'variant');
  }
}
