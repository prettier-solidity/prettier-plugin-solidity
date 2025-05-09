import {
  NonterminalKind,
  TerminalKind,
  TerminalNode
} from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
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
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class Expression implements SlangNode {
  readonly kind = NonterminalKind.Expression;

  comments;

  loc;

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

  constructor(ast: ast.Expression) {
    let metadata = getNodeMetadata(ast);

    if (ast.variant instanceof TerminalNode) {
      this.variant = new Identifier(ast.variant);
    } else {
      switch (ast.variant.cst.kind) {
        case NonterminalKind.AssignmentExpression:
          this.variant = new AssignmentExpression(
            ast.variant as ast.AssignmentExpression
          );
          break;
        case NonterminalKind.ConditionalExpression:
          this.variant = new ConditionalExpression(
            ast.variant as ast.ConditionalExpression
          );
          break;
        case NonterminalKind.OrExpression:
          this.variant = new OrExpression(ast.variant as ast.OrExpression);
          break;
        case NonterminalKind.AndExpression:
          this.variant = new AndExpression(ast.variant as ast.AndExpression);
          break;
        case NonterminalKind.EqualityExpression:
          this.variant = new EqualityExpression(
            ast.variant as ast.EqualityExpression
          );
          break;
        case NonterminalKind.InequalityExpression:
          this.variant = new InequalityExpression(
            ast.variant as ast.InequalityExpression
          );
          break;
        case NonterminalKind.BitwiseOrExpression:
          this.variant = new BitwiseOrExpression(
            ast.variant as ast.BitwiseOrExpression
          );
          break;
        case NonterminalKind.BitwiseXorExpression:
          this.variant = new BitwiseXorExpression(
            ast.variant as ast.BitwiseXorExpression
          );
          break;
        case NonterminalKind.BitwiseAndExpression:
          this.variant = new BitwiseAndExpression(
            ast.variant as ast.BitwiseAndExpression
          );
          break;
        case NonterminalKind.ShiftExpression:
          this.variant = new ShiftExpression(
            ast.variant as ast.ShiftExpression
          );
          break;
        case NonterminalKind.AdditiveExpression:
          this.variant = new AdditiveExpression(
            ast.variant as ast.AdditiveExpression
          );
          break;
        case NonterminalKind.MultiplicativeExpression:
          this.variant = new MultiplicativeExpression(
            ast.variant as ast.MultiplicativeExpression
          );
          break;
        case NonterminalKind.ExponentiationExpression:
          this.variant = new ExponentiationExpression(
            ast.variant as ast.ExponentiationExpression
          );
          break;
        case NonterminalKind.PostfixExpression:
          this.variant = new PostfixExpression(
            ast.variant as ast.PostfixExpression
          );
          break;
        case NonterminalKind.PrefixExpression:
          this.variant = new PrefixExpression(
            ast.variant as ast.PrefixExpression
          );
          break;
        case NonterminalKind.FunctionCallExpression:
          this.variant = new FunctionCallExpression(
            ast.variant as ast.FunctionCallExpression
          );
          break;
        case NonterminalKind.CallOptionsExpression:
          this.variant = new CallOptionsExpression(
            ast.variant as ast.CallOptionsExpression
          );
          break;
        case NonterminalKind.MemberAccessExpression:
          this.variant = new MemberAccessExpression(
            ast.variant as ast.MemberAccessExpression
          );
          break;
        case NonterminalKind.IndexAccessExpression:
          this.variant = new IndexAccessExpression(
            ast.variant as ast.IndexAccessExpression
          );
          break;
        case NonterminalKind.NewExpression:
          this.variant = new NewExpression(ast.variant as ast.NewExpression);
          break;
        case NonterminalKind.TupleExpression:
          this.variant = new TupleExpression(
            ast.variant as ast.TupleExpression
          );
          break;
        case NonterminalKind.TypeExpression:
          this.variant = new TypeExpression(ast.variant as ast.TypeExpression);
          break;
        case NonterminalKind.ArrayExpression:
          this.variant = new ArrayExpression(
            ast.variant as ast.ArrayExpression
          );
          break;
        case NonterminalKind.HexNumberExpression:
          this.variant = new HexNumberExpression(
            ast.variant as ast.HexNumberExpression
          );
          break;
        case NonterminalKind.DecimalNumberExpression:
          this.variant = new DecimalNumberExpression(
            ast.variant as ast.DecimalNumberExpression
          );
          break;
        case NonterminalKind.StringExpression:
          this.variant = new StringExpression(
            ast.variant as ast.StringExpression
          );
          break;
        case NonterminalKind.ElementaryType:
          this.variant = new ElementaryType(ast.variant as ast.ElementaryType);
          break;
        default:
          throw new Error(`Unexpected variant: ${ast.variant.cst.kind}`);
      }
    }

    metadata = updateMetadata(
      metadata,
      this.variant.kind === TerminalKind.Identifier ? [] : [this.variant]
    );

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<Expression>, print: PrintFunction): Doc {
    return path.call(print, 'variant');
  }
}
