import * as ast from '@nomicfoundation/slang/ast';
import { NonterminalKind, TerminalNode } from '@nomicfoundation/slang/cst';
import { printVariant } from '../slang-printers/print-variant.js';
import { SlangNode } from './SlangNode.js';
import { ModifierInvocation } from './ModifierInvocation.js';
import { OverrideSpecifier } from './OverrideSpecifier.js';

import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

function createNonterminalVariant(
  variant: Exclude<ast.FunctionAttribute['variant'], TerminalNode>,
  options: ParserOptions<AstNode>
): Exclude<FunctionAttribute['variant'], string> {
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

  variant: ModifierInvocation | OverrideSpecifier | string;

  constructor(ast: ast.FunctionAttribute, options: ParserOptions<AstNode>) {
    super(ast);

    const variant = ast.variant;
    if (variant instanceof TerminalNode) {
      this.variant = variant.unparse();
      return;
    }
    this.variant = createNonterminalVariant(variant, options);

    this.updateMetadata(this.variant);
  }

  print(path: AstPath<FunctionAttribute>, print: PrintFunction): Doc {
    return printVariant(this, path, print);
  }
}
