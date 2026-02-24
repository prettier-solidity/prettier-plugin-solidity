import * as slangAst from '@nomicfoundation/slang/ast';
import {
  NonterminalKind,
  TerminalNode as SlangTerminalNode
} from '@nomicfoundation/slang/cst';
import { createNonterminalVariantCreator } from '../slang-utils/create-nonterminal-variant-creator.js';
import { SlangNode } from './SlangNode.js';
import { AssignmentExpression } from './AssignmentExpression.js';
import { ConditionalExpression } from './ConditionalExpression.js';
import { OrExpression } from './OrExpression.js';
import { AndExpression } from './AndExpression.js';
import { EqualityExpression } from './EqualityExpression.js';
import { InequalityExpression } from './InequalityExpression.js';
import { BitwiseOrExpression } from './BitwiseOrExpression.js';
import { BitwiseXorExpression } from './BitwiseXorExpression.js';
import { BitwiseAndExpression } from './BitwiseAndExpression.js';
import { ShiftExpression } from './ShiftExpression.js';
import { AdditiveExpression } from './AdditiveExpression.js';
import { MultiplicativeExpression } from './MultiplicativeExpression.js';
import { ExponentiationExpression } from './ExponentiationExpression.js';
import { PostfixExpression } from './PostfixExpression.js';
import { PrefixExpression } from './PrefixExpression.js';
import { FunctionCallExpression } from './FunctionCallExpression.js';
import { CallOptionsExpression } from './CallOptionsExpression.js';
import { MemberAccessExpression } from './MemberAccessExpression.js';
import { IndexAccessExpression } from './IndexAccessExpression.js';
import { NewExpression } from './NewExpression.js';
import { TupleExpression } from './TupleExpression.js';
import { TypeExpression } from './TypeExpression.js';
import { ArrayExpression } from './ArrayExpression.js';
import { HexNumberExpression } from './HexNumberExpression.js';
import { DecimalNumberExpression } from './DecimalNumberExpression.js';
import { StringExpression } from './StringExpression.js';
import { ElementaryType } from './ElementaryType.js';
import { TerminalNode } from './TerminalNode.js';

import type { ParserOptions } from 'prettier';
import type { CollectedMetadata } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

const createNonterminalVariant = createNonterminalVariantCreator<
  slangAst.Expression,
  Expression
>(
  [
    [slangAst.AssignmentExpression, AssignmentExpression],
    [slangAst.ConditionalExpression, ConditionalExpression],
    [slangAst.OrExpression, OrExpression],
    [slangAst.AndExpression, AndExpression],
    [slangAst.EqualityExpression, EqualityExpression],
    [slangAst.InequalityExpression, InequalityExpression],
    [slangAst.BitwiseOrExpression, BitwiseOrExpression],
    [slangAst.BitwiseXorExpression, BitwiseXorExpression],
    [slangAst.BitwiseAndExpression, BitwiseAndExpression],
    [slangAst.ShiftExpression, ShiftExpression],
    [slangAst.AdditiveExpression, AdditiveExpression],
    [slangAst.MultiplicativeExpression, MultiplicativeExpression],
    [slangAst.ExponentiationExpression, ExponentiationExpression],
    [slangAst.PostfixExpression, PostfixExpression],
    [slangAst.PrefixExpression, PrefixExpression],
    [slangAst.FunctionCallExpression, FunctionCallExpression],
    [slangAst.CallOptionsExpression, CallOptionsExpression],
    [slangAst.MemberAccessExpression, MemberAccessExpression],
    [slangAst.IndexAccessExpression, IndexAccessExpression],
    [slangAst.NewExpression, NewExpression],
    [slangAst.TupleExpression, TupleExpression],
    [slangAst.TypeExpression, TypeExpression],
    [slangAst.ArrayExpression, ArrayExpression],
    [slangAst.HexNumberExpression, HexNumberExpression],
    [slangAst.DecimalNumberExpression, DecimalNumberExpression]
  ],
  [
    [slangAst.StringExpression, StringExpression],
    [slangAst.ElementaryType, ElementaryType]
  ]
);

export class Expression extends SlangNode {
  readonly kind = NonterminalKind.Expression;

  variant:
    | AssignmentExpression
    | ConditionalExpression
    | OrExpression
    | AndExpression
    | EqualityExpression
    | InequalityExpression
    | BitwiseOrExpression
    | BitwiseXorExpression
    | BitwiseAndExpression
    | ShiftExpression
    | AdditiveExpression
    | MultiplicativeExpression
    | ExponentiationExpression
    | PostfixExpression
    | PrefixExpression
    | FunctionCallExpression
    | CallOptionsExpression
    | MemberAccessExpression
    | IndexAccessExpression
    | NewExpression
    | TupleExpression
    | TypeExpression
    | ArrayExpression
    | HexNumberExpression
    | DecimalNumberExpression
    | StringExpression['variant']
    | ElementaryType['variant']
    | TerminalNode;

  constructor(
    ast: slangAst.Expression,
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
      // `Expression` in the `createNonterminalVariant` function above.
      ((
        variant: Exclude<slangAst.Expression['variant'], SlangTerminalNode>
      ): void => {
        if (variant instanceof slangAst.AssignmentExpression) return;
        if (variant instanceof slangAst.ConditionalExpression) return;
        if (variant instanceof slangAst.OrExpression) return;
        if (variant instanceof slangAst.AndExpression) return;
        if (variant instanceof slangAst.EqualityExpression) return;
        if (variant instanceof slangAst.InequalityExpression) return;
        if (variant instanceof slangAst.BitwiseOrExpression) return;
        if (variant instanceof slangAst.BitwiseXorExpression) return;
        if (variant instanceof slangAst.BitwiseAndExpression) return;
        if (variant instanceof slangAst.ShiftExpression) return;
        if (variant instanceof slangAst.AdditiveExpression) return;
        if (variant instanceof slangAst.MultiplicativeExpression) return;
        if (variant instanceof slangAst.ExponentiationExpression) return;
        if (variant instanceof slangAst.PostfixExpression) return;
        if (variant instanceof slangAst.PrefixExpression) return;
        if (variant instanceof slangAst.FunctionCallExpression) return;
        if (variant instanceof slangAst.CallOptionsExpression) return;
        if (variant instanceof slangAst.MemberAccessExpression) return;
        if (variant instanceof slangAst.IndexAccessExpression) return;
        if (variant instanceof slangAst.NewExpression) return;
        if (variant instanceof slangAst.TupleExpression) return;
        if (variant instanceof slangAst.TypeExpression) return;
        if (variant instanceof slangAst.ArrayExpression) return;
        if (variant instanceof slangAst.HexNumberExpression) return;
        if (variant instanceof slangAst.DecimalNumberExpression) return;
        if (variant instanceof slangAst.StringExpression) return;
        if (variant instanceof slangAst.ElementaryType) return;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _exhaustiveCheck: never = variant;
      })(variant);
    }
    this.variant = createNonterminalVariant(variant, collected, options);

    this.updateMetadata(this.variant);
  }
}
