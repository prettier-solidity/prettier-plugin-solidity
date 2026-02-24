import * as slangAst from '@nomicfoundation/slang/ast';
import {
  NonterminalKind,
  TerminalNode as SlangTerminalNode
} from '@nomicfoundation/slang/cst';
import { createNonterminalVariantSimpleCreator } from '../slang-utils/create-nonterminal-variant-creator.js';
import { SlangNode } from './SlangNode.js';
import { ExpressionStatement } from './ExpressionStatement.js';
import { VariableDeclarationStatement } from './VariableDeclarationStatement.js';
import { TupleDeconstructionStatement } from './TupleDeconstructionStatement.js';
import { TerminalNode } from './TerminalNode.js';

import type { ParserOptions } from 'prettier';
import type { CollectedMetadata } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

const createNonterminalVariant = createNonterminalVariantSimpleCreator<
  slangAst.ForStatementInitialization,
  ForStatementInitialization
>([
  [slangAst.ExpressionStatement, ExpressionStatement],
  [slangAst.VariableDeclarationStatement, VariableDeclarationStatement],
  [slangAst.TupleDeconstructionStatement, TupleDeconstructionStatement]
]);

export class ForStatementInitialization extends SlangNode {
  readonly kind = NonterminalKind.ForStatementInitialization;

  variant:
    | ExpressionStatement
    | VariableDeclarationStatement
    | TupleDeconstructionStatement
    | TerminalNode;

  constructor(
    ast: slangAst.ForStatementInitialization,
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
      // This is to ensure that we have handled all variants of
      // `ForStatementInitialization` in the `createNonterminalVariant`
      // function above.
      ((
        variant: Exclude<
          slangAst.ForStatementInitialization['variant'],
          SlangTerminalNode
        >
      ): void => {
        if (variant instanceof slangAst.ExpressionStatement) return;
        if (variant instanceof slangAst.VariableDeclarationStatement) return;
        if (variant instanceof slangAst.TupleDeconstructionStatement) return;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _exhaustiveCheck: never = variant;
      })(variant);
    }
    this.variant = createNonterminalVariant(variant, collected, options);

    this.updateMetadata(this.variant);
  }
}
