import { doc } from 'prettier';
import { createKindCheckFunction } from '../slang-utils/create-kind-check-function.js';
import { isBinaryOperation } from '../slang-utils/is-binary-operation.js';
import { createBinaryOperationPrinter } from './create-binary-operation-printer.js';

const { group, indent } = doc.builders;

const isStatementWithoutIndentedOperation = createKindCheckFunction([
  'ReturnStatement',
  'IfStatement',
  'WhileStatement'
]);

const comparisonIndentRulesBuilder = (path) => (document) => {
  let node = path.getNode();
  for (let i = 2; ; i += 2) {
    const grandparentNode = path.getNode(i);
    if (grandparentNode.kind === 'ExpressionStatement') {
      if (path.getNode(i + 1).kind === 'ForStatementCondition') break;
      else return indent(document);
    }
    if (isStatementWithoutIndentedOperation(grandparentNode)) break;
    if (!isBinaryOperation(grandparentNode)) return indent(document);
    if (node === grandparentNode.rightOperand.variant) break;
    node = grandparentNode;
  }
  return document;
};

export const printComparisonOperation = createBinaryOperationPrinter(
  () => (document) => group(document), // always group
  comparisonIndentRulesBuilder
);
