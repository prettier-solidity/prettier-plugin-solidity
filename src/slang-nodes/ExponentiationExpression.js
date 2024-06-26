import { doc } from 'prettier';
import coerce from 'semver/functions/coerce.js';
import satisfies from 'semver/functions/satisfies.js';
import {
  binaryOperationPrintBuilder,
  createHugFunction
} from '../common/slang-helpers.js';

const { group, indent } = doc.builders;

const tryToHug = createHugFunction(['**']);

export const ExponentiationExpression = {
  parse: ({ offsets, ast, options, parse }) => {
    const compiler = coerce(options.compiler);
    let leftOperand = parse(ast.leftOperand, options, parse, offsets);
    let rightOperand = parse(ast.rightOperand, options, parse, offsets);

    if (compiler) {
      if (satisfies(compiler, '>=0.8.0')) {
        rightOperand = tryToHug(rightOperand);
      } else {
        leftOperand = tryToHug(leftOperand);
      }
    }
    return {
      leftOperand,
      operator: ast.operator.text,
      rightOperand
    };
  },
  print: binaryOperationPrintBuilder(
    () => (document) => group(document), // always group
    () => (document) => indent(document) // always indent
  )
};
