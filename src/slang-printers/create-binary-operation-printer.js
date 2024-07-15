import { doc } from 'prettier';
import { isBinaryOperation } from '../slang-utils/is-binary-operation.js';

const { group, line } = doc.builders;

function rightOperandPrint(node, path, print) {
  const rightOperand = [line, path.call(print, 'rightOperand')];

  // If it's a single binary operation, avoid having a small right
  // operand like - 1 on its own line
  const shouldGroup =
    !isBinaryOperation(node.leftOperand.variant) &&
    !isBinaryOperation(path.getNode(2));

  return shouldGroup ? group(rightOperand) : rightOperand;
}

export const createBinaryOperationPrinter =
  (groupRulesBuilder, indentRulesBuilder) =>
  ({ node, path, print, options }) => {
    const groupRules = groupRulesBuilder(path);
    const indentRules = indentRulesBuilder(path, options);

    return groupRules([
      path.call(print, 'leftOperand'),
      ` ${node.operator}`,
      indentRules(rightOperandPrint(node, path, print))
    ]);
  };
