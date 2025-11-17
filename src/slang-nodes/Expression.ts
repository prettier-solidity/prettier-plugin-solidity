import * as ast from '@nomicfoundation/slang/ast';
import {
  NonterminalKind,
  TerminalNode as SlangTerminalNode
} from '@nomicfoundation/slang/cst';
import { extractVariant } from '../slang-utils/extract-variant.js';
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
import type { AstNode } from './types.d.ts';

function createNonterminalVariant(
  variant: Exclude<ast.Expression['variant'], SlangTerminalNode>,
  options: ParserOptions<AstNode>
): Expression['variant'] {
  if (variant instanceof ast.AssignmentExpression) {
    return new AssignmentExpression(variant, options);
  }
  if (variant instanceof ast.ConditionalExpression) {
    return new ConditionalExpression(variant, options);
  }
  if (variant instanceof ast.OrExpression) {
    return new OrExpression(variant, options);
  }
  if (variant instanceof ast.AndExpression) {
    return new AndExpression(variant, options);
  }
  if (variant instanceof ast.EqualityExpression) {
    return new EqualityExpression(variant, options);
  }
  if (variant instanceof ast.InequalityExpression) {
    return new InequalityExpression(variant, options);
  }
  if (variant instanceof ast.BitwiseOrExpression) {
    return new BitwiseOrExpression(variant, options);
  }
  if (variant instanceof ast.BitwiseXorExpression) {
    return new BitwiseXorExpression(variant, options);
  }
  if (variant instanceof ast.BitwiseAndExpression) {
    return new BitwiseAndExpression(variant, options);
  }
  if (variant instanceof ast.ShiftExpression) {
    return new ShiftExpression(variant, options);
  }
  if (variant instanceof ast.AdditiveExpression) {
    return new AdditiveExpression(variant, options);
  }
  if (variant instanceof ast.MultiplicativeExpression) {
    return new MultiplicativeExpression(variant, options);
  }
  if (variant instanceof ast.ExponentiationExpression) {
    return new ExponentiationExpression(variant, options);
  }
  if (variant instanceof ast.PostfixExpression) {
    return new PostfixExpression(variant, options);
  }
  if (variant instanceof ast.PrefixExpression) {
    return new PrefixExpression(variant, options);
  }
  if (variant instanceof ast.FunctionCallExpression) {
    return new FunctionCallExpression(variant, options);
  }
  if (variant instanceof ast.CallOptionsExpression) {
    return new CallOptionsExpression(variant, options);
  }
  if (variant instanceof ast.MemberAccessExpression) {
    return new MemberAccessExpression(variant, options);
  }
  if (variant instanceof ast.IndexAccessExpression) {
    return new IndexAccessExpression(variant, options);
  }
  if (variant instanceof ast.NewExpression) {
    return new NewExpression(variant, options);
  }
  if (variant instanceof ast.TupleExpression) {
    return new TupleExpression(variant, options);
  }
  if (variant instanceof ast.TypeExpression) {
    return new TypeExpression(variant, options);
  }
  if (variant instanceof ast.ArrayExpression) {
    return new ArrayExpression(variant, options);
  }
  if (variant instanceof ast.HexNumberExpression) {
    return new HexNumberExpression(variant);
  }
  if (variant instanceof ast.DecimalNumberExpression) {
    return new DecimalNumberExpression(variant);
  }
  if (variant instanceof ast.StringExpression) {
    return extractVariant(new StringExpression(variant, options));
  }
  if (variant instanceof ast.ElementaryType) {
    return extractVariant(new ElementaryType(variant));
  }
  const exhaustiveCheck: never = variant;
  throw new Error(`Unexpected variant: ${JSON.stringify(exhaustiveCheck)}`);
}

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

  constructor(ast: ast.Expression, options: ParserOptions<AstNode>) {
    super(ast);

    const variant = ast.variant;
    if (variant instanceof SlangTerminalNode) {
      this.variant = new TerminalNode(variant);
      return;
    }
    this.variant = createNonterminalVariant(variant, options);

    this.updateMetadata(this.variant);
  }
}
