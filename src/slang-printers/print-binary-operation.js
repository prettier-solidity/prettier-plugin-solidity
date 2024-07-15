import { doc } from 'prettier';
import { createBinaryOperationPrinter } from './create-binary-operation-printer.js';
import { createKindCheckFunction } from '../slang-utils/create-kind-check-function.js';

const { group, indent } = doc.builders;

const isBinaryOperationWithoutComparison = createKindCheckFunction([
  'AdditiveExpression',
  'MultiplicativeExpression',
  'ExponentiationExpression',
  'AssignmentExpression',
  'BitwiseAndExpression',
  'BitwiseOrExpression',
  'BitwiseXorExpression',
  'AndExpression',
  'OrExpression',
  'ShiftExpression'
]);

const binaryGroupRulesBuilder = (path) => (document) => {
  const grandparentNode = path.getNode(2);
  if (isBinaryOperationWithoutComparison(grandparentNode)) {
    return document;
  }
  return group(document);
};

const binaryIndentRulesBuilder = (path) => (document) => {
  let node = path.getNode();
  for (let i = 2; ; i += 2) {
    const grandparentNode = path.getNode(i);
    if (grandparentNode.kind === 'ReturnStatement') break;
    if (!isBinaryOperationWithoutComparison(grandparentNode)) {
      return indent(document);
    }
    if (node === grandparentNode.rightOperand.variant) break;
    node = grandparentNode;
  }
  return document;
};

export const printBinaryOperation = createBinaryOperationPrinter(
  binaryGroupRulesBuilder,
  binaryIndentRulesBuilder
);
