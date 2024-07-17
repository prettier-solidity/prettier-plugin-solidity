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
  variant;

  constructor(ast, offset, comments, options) {
    super();
    if (offset) {
      const fetch = (childrenOffsets) => {
        const { variant } = ast;
        this.variant =
          variant.type === 'Terminal'
            ? variant.text
            : new variants[variant.cst.kind](
                variant,
                childrenOffsets.shift(),
                comments,
                options
              );
      };

      this.initialize(ast, offset, fetch, comments);
    } else {
      this.kind = ast.kind;
      this.loc = ast.loc;
      this.variant = ast.variant;
    }
  }

  print(path, print) {
    return typeof this.variant === 'string'
      ? this.variant
      : path.call(print, 'variant');
  }
}
