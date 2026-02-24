import * as slangAst from '@nomicfoundation/slang/ast';
import {
  NonterminalKind,
  TerminalNode as SlangTerminalNode
} from '@nomicfoundation/slang/cst';
import { createNonterminalVariantSimpleCreator } from '../slang-utils/create-nonterminal-variant-creator.js';
import { SlangNode } from './SlangNode.js';
import { HexStringLiteral } from './HexStringLiteral.js';
import { StringLiteral } from './StringLiteral.js';
import { TerminalNode } from './TerminalNode.js';

import type { ParserOptions } from 'prettier';
import type { CollectedMetadata } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

const createNonterminalVariant = createNonterminalVariantSimpleCreator<
  slangAst.YulLiteral,
  YulLiteral
>([
  [slangAst.HexStringLiteral, HexStringLiteral],
  [slangAst.StringLiteral, StringLiteral]
]);

export class YulLiteral extends SlangNode {
  readonly kind = NonterminalKind.YulLiteral;

  variant: HexStringLiteral | StringLiteral | TerminalNode;

  constructor(
    ast: slangAst.YulLiteral,
    collected: CollectedMetadata,
    options: ParserOptions<AstNode>
  ) {
    super(ast, collected);

    const variant = ast.variant;
    if (variant instanceof SlangTerminalNode) {
      this.variant = new TerminalNode(variant, collected);
      return;
    }
    if (process.env.NODE_ENV === 'test') {
      // This is to ensure that we have handled all variants of `YulLiteral`
      // in the `createNonterminalVariant` function above.
      ((
        variant: Exclude<slangAst.YulLiteral['variant'], SlangTerminalNode>
      ): void => {
        if (variant instanceof slangAst.HexStringLiteral) return;
        if (variant instanceof slangAst.StringLiteral) return;
        /* c8 ignore next 2 */
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _exhaustiveCheck: never = variant;
      })(variant);
    }
    this.variant = createNonterminalVariant(variant, collected, options);

    this.updateMetadata(this.variant);
  }
}
