import { createKindCheckFunction } from './create-kind-check-function.js';

export const isBinaryOperation = createKindCheckFunction([
  'AdditiveExpression',
  'MultiplicativeExpression',
  'ExponentiationExpression',
  'AssignmentExpression',
  'BitwiseAndExpression',
  'BitwiseOrExpression',
  'BitwiseXorExpression',
  'ComparisonExpression',
  'EqualityExpression',
  'AndExpression',
  'OrExpression',
  'ShiftExpression'
]);
