import {
  NonterminalKind,
  SlangAst,
  TerminalNode as SlangTerminalNode
} from '../slang-utils/slang.ts';
import { createNonterminalVariantCreator } from '../slang-utils/create-nonterminal-variant-creator.ts';
import { SlangNode } from './SlangNode.ts';
import { AssignmentExpression } from './AssignmentExpression.ts';
import { ConditionalExpression } from './ConditionalExpression.ts';
import { OrExpression } from './OrExpression.ts';
import { AndExpression } from './AndExpression.ts';
import { EqualityExpression } from './EqualityExpression.ts';
import { InequalityExpression } from './InequalityExpression.ts';
import { BitwiseOrExpression } from './BitwiseOrExpression.ts';
import { BitwiseXorExpression } from './BitwiseXorExpression.ts';
import { BitwiseAndExpression } from './BitwiseAndExpression.ts';
import { ShiftExpression } from './ShiftExpression.ts';
import { AdditiveExpression } from './AdditiveExpression.ts';
import { MultiplicativeExpression } from './MultiplicativeExpression.ts';
import { ExponentiationExpression } from './ExponentiationExpression.ts';
import { PostfixExpression } from './PostfixExpression.ts';
import { PrefixExpression } from './PrefixExpression.ts';
import { FunctionCallExpression } from './FunctionCallExpression.ts';
import { CallOptionsExpression } from './CallOptionsExpression.ts';
import { MemberAccessExpression } from './MemberAccessExpression.ts';
import { IndexAccessExpression } from './IndexAccessExpression.ts';
import { NewExpression } from './NewExpression.ts';
import { TupleExpression } from './TupleExpression.ts';
import { TypeExpression } from './TypeExpression.ts';
import { ArrayExpression } from './ArrayExpression.ts';
import { HexNumberExpression } from './HexNumberExpression.ts';
import { DecimalNumberExpression } from './DecimalNumberExpression.ts';
import { StringExpression } from './StringExpression.ts';
import { ElementaryType } from './ElementaryType.ts';
import { TerminalNode } from './TerminalNode.ts';

import type * as ast from '@nomicfoundation/slang/ast';
import type { CollectedMetadata } from '../types.d.ts';

const createNonterminalVariant = createNonterminalVariantCreator<
  ast.Expression,
  Expression
>(
  () => [
    [SlangAst.AssignmentExpression, AssignmentExpression],
    [SlangAst.ConditionalExpression, ConditionalExpression],
    [SlangAst.OrExpression, OrExpression],
    [SlangAst.AndExpression, AndExpression],
    [SlangAst.EqualityExpression, EqualityExpression],
    [SlangAst.InequalityExpression, InequalityExpression],
    [SlangAst.BitwiseOrExpression, BitwiseOrExpression],
    [SlangAst.BitwiseXorExpression, BitwiseXorExpression],
    [SlangAst.BitwiseAndExpression, BitwiseAndExpression],
    [SlangAst.ShiftExpression, ShiftExpression],
    [SlangAst.AdditiveExpression, AdditiveExpression],
    [SlangAst.MultiplicativeExpression, MultiplicativeExpression],
    [SlangAst.ExponentiationExpression, ExponentiationExpression],
    [SlangAst.PostfixExpression, PostfixExpression],
    [SlangAst.PrefixExpression, PrefixExpression],
    [SlangAst.FunctionCallExpression, FunctionCallExpression],
    [SlangAst.CallOptionsExpression, CallOptionsExpression],
    [SlangAst.MemberAccessExpression, MemberAccessExpression],
    [SlangAst.IndexAccessExpression, IndexAccessExpression],
    [SlangAst.NewExpression, NewExpression],
    [SlangAst.TupleExpression, TupleExpression],
    [SlangAst.TypeExpression, TypeExpression],
    [SlangAst.ArrayExpression, ArrayExpression],
    [SlangAst.HexNumberExpression, HexNumberExpression],
    [SlangAst.DecimalNumberExpression, DecimalNumberExpression]
  ],
  () => [
    [SlangAst.StringExpression, StringExpression],
    [SlangAst.ElementaryType, ElementaryType]
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

  constructor(ast: ast.Expression, collected: CollectedMetadata) {
    super(ast, collected);

    const variant = ast.variant;
    if (variant instanceof SlangTerminalNode) {
      this.variant = new TerminalNode(variant, collected);
      return;
    }
    this.variant = createNonterminalVariant(variant, collected);

    this.updateMetadata(this.variant);
  }
}
