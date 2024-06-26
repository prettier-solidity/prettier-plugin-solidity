import { doc } from 'prettier';
import { isBinaryOperation } from '../common/slang-helpers.js';

const { group, indent, line } = doc.builders;

export const AssignmentExpression = {
  parse: ({ offsets, ast, options, parse }) => ({
    leftOperand: parse(ast.leftOperand, options, parse, offsets),
    operator: ast.operator.text,
    rightOperand: parse(ast.rightOperand, options, parse, offsets)
  }),
  print: ({ node, path, print }) => [
    path.call(print, 'leftOperand'),
    ` ${node.operator}`,
    isBinaryOperation(node.rightOperand.variant)
      ? group(indent([line, path.call(print, 'rightOperand')]))
      : [' ', path.call(print, 'rightOperand')]
  ]
};
