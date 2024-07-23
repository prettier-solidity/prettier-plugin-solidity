import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { AssignmentExpression } from './AssignmentExpression.js';
import { ConditionalExpression } from './ConditionalExpression.js';
import { OrExpression } from './OrExpression.js';
import { AndExpression } from './AndExpression.js';
import { EqualityExpression } from './EqualityExpression.js';
import { ComparisonExpression } from './ComparisonExpression.js';
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

const variants = {
  AssignmentExpression,
  ConditionalExpression,
  OrExpression,
  AndExpression,
  EqualityExpression,
  ComparisonExpression,
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
  DecimalNumberExpression,
  StringExpression,
  ElementaryType
};

export class Expression extends SlangNode {
  get kind() {
    return NonterminalKind.Expression;
  }

  variant;

  constructor(ast, offset, options) {
    super();

    const fetch = (offsets) => ({
      variant:
        ast.variant.type === 'Terminal'
          ? ast.variant.text
          : new variants[ast.variant.cst.kind](ast.variant, offsets[0], options)
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return typeof this.variant === 'string'
      ? this.variant
      : path.call(print, 'variant');
  }
}
