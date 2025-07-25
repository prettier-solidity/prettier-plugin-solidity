import { NonterminalKind, TerminalNode } from '@nomicfoundation/slang/cst';
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
import { Identifier } from './Identifier.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

function createNonterminalVariant(
  variant: Exclude<ast.Expression['variant'], TerminalNode>,
  options: ParserOptions<AstNode>
): Exclude<Expression['variant'], Identifier> {
  switch (variant.cst.kind) {
    case NonterminalKind.AssignmentExpression:
      return new AssignmentExpression(
        variant as ast.AssignmentExpression,
        options
      );
    case NonterminalKind.ConditionalExpression:
      return new ConditionalExpression(
        variant as ast.ConditionalExpression,
        options
      );
    case NonterminalKind.OrExpression:
      return new OrExpression(variant as ast.OrExpression, options);
    case NonterminalKind.AndExpression:
      return new AndExpression(variant as ast.AndExpression, options);
    case NonterminalKind.EqualityExpression:
      return new EqualityExpression(variant as ast.EqualityExpression, options);
    case NonterminalKind.InequalityExpression:
      return new InequalityExpression(
        variant as ast.InequalityExpression,
        options
      );
    case NonterminalKind.BitwiseOrExpression:
      return new BitwiseOrExpression(
        variant as ast.BitwiseOrExpression,
        options
      );
    case NonterminalKind.BitwiseXorExpression:
      return new BitwiseXorExpression(
        variant as ast.BitwiseXorExpression,
        options
      );
    case NonterminalKind.BitwiseAndExpression:
      return new BitwiseAndExpression(
        variant as ast.BitwiseAndExpression,
        options
      );
    case NonterminalKind.ShiftExpression:
      return new ShiftExpression(variant as ast.ShiftExpression, options);
    case NonterminalKind.AdditiveExpression:
      return new AdditiveExpression(variant as ast.AdditiveExpression, options);
    case NonterminalKind.MultiplicativeExpression:
      return new MultiplicativeExpression(
        variant as ast.MultiplicativeExpression,
        options
      );
    case NonterminalKind.ExponentiationExpression:
      return new ExponentiationExpression(
        variant as ast.ExponentiationExpression,
        options
      );
    case NonterminalKind.PostfixExpression:
      return new PostfixExpression(variant as ast.PostfixExpression, options);
    case NonterminalKind.PrefixExpression:
      return new PrefixExpression(variant as ast.PrefixExpression, options);
    case NonterminalKind.FunctionCallExpression:
      return new FunctionCallExpression(
        variant as ast.FunctionCallExpression,
        options
      );
    case NonterminalKind.CallOptionsExpression:
      return new CallOptionsExpression(
        variant as ast.CallOptionsExpression,
        options
      );
    case NonterminalKind.MemberAccessExpression:
      return new MemberAccessExpression(
        variant as ast.MemberAccessExpression,
        options
      );
    case NonterminalKind.IndexAccessExpression:
      return new IndexAccessExpression(
        variant as ast.IndexAccessExpression,
        options
      );
    case NonterminalKind.NewExpression:
      return new NewExpression(variant as ast.NewExpression, options);
    case NonterminalKind.TupleExpression:
      return new TupleExpression(variant as ast.TupleExpression, options);
    case NonterminalKind.TypeExpression:
      return new TypeExpression(variant as ast.TypeExpression, options);
    case NonterminalKind.ArrayExpression:
      return new ArrayExpression(variant as ast.ArrayExpression, options);
    case NonterminalKind.HexNumberExpression:
      return new HexNumberExpression(variant as ast.HexNumberExpression);
    case NonterminalKind.DecimalNumberExpression:
      return new DecimalNumberExpression(
        variant as ast.DecimalNumberExpression
      );
    case NonterminalKind.StringExpression:
      return new StringExpression(variant as ast.StringExpression, options);
    case NonterminalKind.ElementaryType:
      return new ElementaryType(variant as ast.ElementaryType);
    default:
      throw new Error(`Unexpected variant: ${variant.cst.kind}`);
  }
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
    | StringExpression
    | ElementaryType
    | Identifier;

  constructor(ast: ast.Expression, options: ParserOptions<AstNode>) {
    super(ast);

    const variant = ast.variant;
    if (variant instanceof TerminalNode) {
      this.variant = new Identifier(variant);
      return;
    }
    this.variant = createNonterminalVariant(variant, options);

    this.updateMetadata(this.variant);
  }

  print(path: AstPath<Expression>, print: PrintFunction): Doc {
    return path.call(print, 'variant');
  }
}
