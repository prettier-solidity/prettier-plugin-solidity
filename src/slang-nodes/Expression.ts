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
import type { CollectedMetadata } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

const keys = [
  ast.AssignmentExpression,
  ast.ConditionalExpression,
  ast.OrExpression,
  ast.AndExpression,
  ast.EqualityExpression,
  ast.InequalityExpression,
  ast.BitwiseOrExpression,
  ast.BitwiseXorExpression,
  ast.BitwiseAndExpression,
  ast.ShiftExpression,
  ast.AdditiveExpression,
  ast.MultiplicativeExpression,
  ast.ExponentiationExpression,
  ast.PostfixExpression,
  ast.PrefixExpression,
  ast.FunctionCallExpression,
  ast.CallOptionsExpression,
  ast.MemberAccessExpression,
  ast.IndexAccessExpression,
  ast.NewExpression,
  ast.TupleExpression,
  ast.TypeExpression,
  ast.ArrayExpression,
  ast.HexNumberExpression,
  ast.DecimalNumberExpression
];
const constructors = [
  AssignmentExpression,
  ConditionalExpression,
  OrExpression,
  AndExpression,
  EqualityExpression,
  InequalityExpression,
  BitwiseOrExpression,
  BitwiseXorExpression,
  BitwiseAndExpression,
  ShiftExpression,
  AdditiveExpression,
  MultiplicativeExpression,
  ExponentiationExpression,
  PostfixExpression,
  PrefixExpression,
  FunctionCallExpression,
  CallOptionsExpression,
  MemberAccessExpression,
  IndexAccessExpression,
  NewExpression,
  TupleExpression,
  TypeExpression,
  ArrayExpression,
  HexNumberExpression,
  DecimalNumberExpression
];

const variantConstructors = new Map<string, (typeof constructors)[number]>(
  keys.map((key, index) => [key.name, constructors[index]])
);

const keysWithVariants = [ast.StringExpression, ast.ElementaryType];
const constructorsWithVariants = [StringExpression, ElementaryType];

const variantWithVariantsConstructors = new Map<
  string,
  (typeof constructorsWithVariants)[number]
>(
  keysWithVariants.map((key, index) => [
    key.name,
    constructorsWithVariants[index]
  ])
);

function createNonterminalVariant(
  variant: Exclude<ast.Expression['variant'], SlangTerminalNode>,
  collected: CollectedMetadata,
  options: ParserOptions<AstNode>
): Expression['variant'] {
  const variantConstructor = variantConstructors.get(variant.constructor.name);
  if (variantConstructor !== undefined)
    return new variantConstructor(variant as never, collected, options);

  const variantWithVariantsConstructor = variantWithVariantsConstructors.get(
    variant.constructor.name
  );
  if (variantWithVariantsConstructor !== undefined)
    return extractVariant(
      new variantWithVariantsConstructor(variant as never, collected, options)
    );

  throw new Error(`Unexpected variant: ${JSON.stringify(variant)}`);
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
