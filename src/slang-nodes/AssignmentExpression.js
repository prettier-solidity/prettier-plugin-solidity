import { doc } from 'prettier';
import { binaryOperationKinds } from '../common/slang-helpers.js';

const { group, indent, line } = doc.builders;

export const AssignmentExpression = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    leftOperand: parse(ast.leftOperand, options, parse),
    operator: ast.operator.text,
    rightOperand: parse(ast.rightOperand, options, parse)
  }),
  print: ({ node, path, print }) => [
    path.call(print, 'leftOperand'),
    ` ${node.operator}`,
    binaryOperationKinds.includes(node.rightOperand.variant.kind)
      ? group(indent([line, path.call(print, 'rightOperand')]))
      : [' ', path.call(print, 'rightOperand')]
  ]
};
