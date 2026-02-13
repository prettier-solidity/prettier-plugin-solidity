import * as ast from '@nomicfoundation/slang/ast';
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
  ast.Expression,
  Expression
>(
  [
    [ast.AssignmentExpression, AssignmentExpression],
    [ast.ConditionalExpression, ConditionalExpression],
    [ast.OrExpression, OrExpression],
    [ast.AndExpression, AndExpression],
    [ast.EqualityExpression, EqualityExpression],
    [ast.InequalityExpression, InequalityExpression],
    [ast.BitwiseOrExpression, BitwiseOrExpression],
    [ast.BitwiseXorExpression, BitwiseXorExpression],
    [ast.BitwiseAndExpression, BitwiseAndExpression],
    [ast.ShiftExpression, ShiftExpression],
    [ast.AdditiveExpression, AdditiveExpression],
    [ast.MultiplicativeExpression, MultiplicativeExpression],
    [ast.ExponentiationExpression, ExponentiationExpression],
    [ast.PostfixExpression, PostfixExpression],
    [ast.PrefixExpression, PrefixExpression],
    [ast.FunctionCallExpression, FunctionCallExpression],
    [ast.CallOptionsExpression, CallOptionsExpression],
    [ast.MemberAccessExpression, MemberAccessExpression],
    [ast.IndexAccessExpression, IndexAccessExpression],
    [ast.NewExpression, NewExpression],
    [ast.TupleExpression, TupleExpression],
    [ast.TypeExpression, TypeExpression],
    [ast.ArrayExpression, ArrayExpression],
    [ast.HexNumberExpression, HexNumberExpression],
    [ast.DecimalNumberExpression, DecimalNumberExpression]
  ],
  [
    [ast.StringExpression, StringExpression],
    [ast.ElementaryType, ElementaryType]
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
    ast: ast.Expression,
    collected: CollectedMetadata,
    options: ParserOptions<AstNode>
  ) {
    super(ast, collected);

    const variant = ast.variant;
    if (variant instanceof SlangTerminalNode) {
      this.variant = new TerminalNode(variant, collected);
      return;
    }
    this.variant = createNonterminalVariant(variant, collected, options);

    this.updateMetadata(this.variant);
  }
}
