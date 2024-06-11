import { doc } from 'prettier';
import { rightOperandPrint } from '../common/slang-helpers.js';

const { group, indent } = doc.builders;

export const ExponentiationExpression = {
  parse: ({ ast, options, parse }) => ({
    kind: ast.cst.kind,
    leftOperand: parse(ast.leftOperand, options, parse),
    operator: ast.operator.text,
    rightOperand: parse(ast.rightOperand, options, parse)
  }),
  print: ({ node, path, print }) =>
    group([
      path.call(print, 'leftOperand'),
      ` ${node.operator}`,
      indent(rightOperandPrint(node, path, print))
    ])
};
