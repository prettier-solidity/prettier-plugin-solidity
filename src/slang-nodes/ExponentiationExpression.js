import { doc } from 'prettier';
import coerce from 'semver/functions/coerce.js';
import satisfies from 'semver/functions/satisfies.js';
import { rightOperandPrint, tryHug } from '../common/slang-helpers.js';

const { group, indent } = doc.builders;

export const ExponentiationExpression = {
  parse: ({ ast, options, parse }) => {
    const compiler = coerce(options.compiler);
    let leftOperand = parse(ast.leftOperand, options, parse);
    let rightOperand = parse(ast.rightOperand, options, parse);

    if (compiler) {
      if (satisfies(compiler, '>=0.8.0')) {
        rightOperand = tryHug(rightOperand, ['**']);
      } else {
        leftOperand = tryHug(leftOperand, ['**']);
      }
    }
    return {
      kind: ast.cst.kind,
      leftOperand,
      operator: ast.operator.text,
      rightOperand
    };
  },
  print: ({ node, path, print }) =>
    group([
      path.call(print, 'leftOperand'),
      ` ${node.operator}`,
      indent(rightOperandPrint(node, path, print))
    ])
};
